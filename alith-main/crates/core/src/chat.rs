pub use crate::client::{
    CompletionRequest as BackendCompletionRequest, CompletionResponse as Response,
};
use crate::store::DocumentId;
use crate::task::TaskError;
pub use alith_interface::requests::completion::{TokenUsage, ToolDefinition};
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// A trait representing a prompt-based interaction mechanism.
///
/// This trait defines the behavior of components that process user prompts
/// and return responses asynchronously.
///
/// # Associated Types
/// - `PromptError`: Represents errors that may occur during prompt processing.
///
/// # Requirements
/// Implementors of this trait must ensure thread safety (`Send` and `Sync`)
/// and provide an asynchronous implementation for the `prompt` method.
#[async_trait]
pub trait Chat: Send + Sync {
    /// Processes the given prompt and returns a response asynchronously.
    ///
    /// # Arguments
    /// - `prompt`: The input string provided by the user.
    ///
    /// # Returns
    /// A future that resolves to either:
    /// - `Ok(String)`: The generated response as a string.
    /// - `Err(Self::PromptError)`: An error that occurred during prompt processing.
    async fn prompt(&self, prompt: &str) -> Result<String, TaskError>;
    /// Processes the given prompt and history and returns a response asynchronously.
    async fn chat(&self, prompt: &str, history: Vec<Message>) -> Result<String, TaskError>;
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Message {
    /// "system", "user", "tool", or "assistant"
    pub role: String,
    pub content: String,
}

/// Represents a document with an ID, text, and additional properties.
#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Document {
    /// The unique identifier of the document.
    pub id: DocumentId,
    /// The text content of the document.
    pub text: String,
    /// Additional properties associated with the document, represented as key-value pairs.
    #[serde(flatten)]
    pub additional_props: HashMap<String, String>,
}

impl std::fmt::Display for Document {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            concat!("<document id: {}>\n", "{}\n", "</document>\n"),
            self.id.0,
            if self.additional_props.is_empty() {
                self.text.clone()
            } else {
                let mut sorted_props = self.additional_props.iter().collect::<Vec<_>>();
                sorted_props.sort_by(|a, b| a.0.cmp(b.0));
                let metadata = sorted_props
                    .iter()
                    .map(|(k, v)| format!("{}: {:?}", k, v))
                    .collect::<Vec<_>>()
                    .join(" ");
                format!("<metadata {} />\n{}", metadata, self.text)
            }
        )
    }
}

/// Represents a request sent to a language model for generating a completion response.
///
/// This struct provides a flexible interface to configure the language model's behavior
/// and enhance its outputs with additional tools, documents, and contextual information.
/// It is suited for a wide range of use cases, from simple prompt completions to
/// advanced multi-turn interactions or tool-augmented tasks.
#[derive(Debug, Clone, Default)]
pub struct Request {
    /// The user-provided input text that the language model must complete or respond to.
    ///
    /// This is the primary query or message that serves as the basis for the model's response.
    pub prompt: String,

    /// A system-defined preamble to guide the behavior and tone of the model.
    ///
    /// Use this field to provide specific instructions to the model, such as role-playing as
    /// an expert, adhering to a formal tone, or aligning responses with certain principles.
    pub preamble: String,

    /// A collection of knowledge sources available for enriching the request prompt.
    ///
    /// These knowledge sources are represented as `Box<dyn Knowledge>` objects,
    /// which implement the `Knowledge` trait. Each knowledge source can process
    /// the input prompt and return additional contextual or enriched information.
    pub knowledges: Vec<String>,

    /// A sequence of previous messages exchanged in the conversation.
    ///
    /// This provides context for multi-turn interactions, enabling the model to maintain
    /// coherence and relevance across turns.
    pub history: Vec<Message>,

    /// Optional: Defines the maximum number of tokens allowed for the generated response.
    ///
    /// When set, this value restricts the length of the model's output. If not provided,
    /// the system may use a default or determine the length dynamically.
    pub max_tokens: Option<usize>,

    /// Optional: Controls the randomness of the text generation process.
    ///
    /// Higher values (e.g., 1.0) result in more creative and diverse responses, while lower
    /// values (e.g., 0.2) make the output more focused and deterministic. If `None`, the system
    /// uses a default temperature.
    pub temperature: Option<f32>,

    /// An alternative to sampling with temperature, called nucleus sampling,
    /// where the model considers the results of the tokens with top_p probability mass.
    /// So 0.1 means only the tokens comprising the top 10% probability mass are considered.
    pub top_p: Option<f32>, // min: 0, max: 1, default: 1

    /// Top-K sampling described in academic paper "The Curious Case of Neural Text Degeneration" https://arxiv.org/abs/1904.09751
    pub top_k: Option<usize>,

    /// A collection of tools available for tool-based interactions with the model.
    ///
    /// Tools are external systems, APIs, or utilities that the model can invoke to perform
    /// specific tasks or enhance its responses.
    pub tools: Vec<ToolDefinition>,

    /// A collection of documents that provide context or background information for the model.
    ///
    /// These documents can be used by the model to generate more accurate and informed responses.
    /// Examples include research papers, policy documents, or reference materials.
    pub documents: Vec<Document>,
}

impl Request {
    /// Constructs a new `Request` with the given prompt and preamble.
    ///
    /// # Arguments
    /// - `prompt`: A string representing the user's input prompt.
    /// - `preamble`: A string that defines the system preamble to guide the model.
    ///
    /// # Returns
    /// A new instance of the `Request` struct.
    pub fn new(prompt: String, preamble: String) -> Self {
        Self {
            prompt,
            preamble,
            knowledges: Vec::new(),
            history: Vec::new(),
            max_tokens: None,
            top_p: None,
            top_k: None,
            temperature: None,
            tools: Vec::new(),
            documents: Vec::new(),
        }
    }

    /// Constructs a prompt string that includes the context from the attached documents.
    ///
    /// # Returns
    /// A string containing the formatted prompt with document attachments, if any.
    pub(crate) fn prompt_with_context(&self, prompt: String) -> String {
        if !self.documents.is_empty() {
            format!(
                "<attachments>\n{}</attachments>\n\n{}",
                self.documents
                    .iter()
                    .map(|doc| doc.to_string())
                    .collect::<Vec<_>>()
                    .join(""),
                prompt
            )
        } else {
            prompt.clone()
        }
    }

    pub fn effective_prompt(&self) -> String {
        let mut input = self.prompt.clone();
        // Add knowledge sources if provided
        for knowledge in &self.knowledges {
            input.push('\n');
            input.push_str(knowledge);
        }
        // Add user prompt with or without the document context
        if self.documents.is_empty() {
            input
        } else {
            self.prompt_with_context(input)
        }
    }

    /// Returns the map messages like
    /// ```no_check
    /// [
    ///     {"role": "system", "content": "system_msg"},
    ///     {"role": "user", "content": "user_msg"},
    ///     {"role": "assistant", "content": "ai_msg"},
    /// ]
    /// ```
    pub fn map_messages(&self) -> Vec<HashMap<String, String>> {
        let mut messages = Vec::new();
        messages.push(HashMap::from([
            ("role".to_string(), "system".to_string()),
            ("content".to_string(), self.preamble.clone()),
        ]));
        for m in &self.history {
            messages.push(HashMap::from([
                ("role".to_string(), m.role.clone()),
                ("content".to_string(), m.content.clone()),
            ]));
        }
        messages.push(HashMap::from([
            ("role".to_string(), "user".to_string()),
            ("content".to_string(), self.effective_prompt()),
        ]));
        messages
    }
}

/// A trait for extracting the content from a language model's response.
pub trait ResponseContent {
    /// Retrieves the main content from the response.
    ///
    /// # Returns
    /// A string containing the text content of the response.
    fn content(&self) -> String;
}

/// A trait for extracting tool-based calls from a language model's response.
pub trait ResponseToolCalls {
    /// Extracts tool calls from the response.
    ///
    /// # Returns
    /// A vector of `ToolCall` objects representing tool-related interactions.
    fn toolcalls(&self) -> Vec<ToolCall>;
}

/// A trait for extracting total token cost from a language model's response.
pub trait ResponseTokenUsage {
    fn token_usage(&self) -> TokenUsage;
}

/// Represents a call to a specific tool in a response.
pub struct ToolCall {
    /// The unique identifier for the tool call.
    pub id: String,
    /// The type of the tool call.
    pub r#type: String,
    /// The function being called, along with its name and arguments.
    pub function: CallFunction,
}

/// Represents a callable function within a tool interaction.
pub struct CallFunction {
    /// The name of the function being invoked.
    pub name: String,
    /// The arguments provided to the function as a string.
    pub arguments: String,
}

/// A trait defining the behavior of a completion engine.
///
/// This trait is used by components that handle requests for text generation
/// (or similar completions) and generate responses asynchronously.
///
/// # Associated Types
/// - `Response`: The specific type of the response generated by the completion engine.
pub trait Completion {
    /// The type of response returned by the `completion` method.
    type Response: Send + Sync + ResponseContent + ResponseToolCalls + ResponseTokenUsage;

    /// Processes a `Request` and returns the generated response asynchronously.
    ///
    /// # Arguments
    /// - `request`: The request object containing the prompt and additional configuration.
    ///
    /// # Returns
    /// A future that resolves to either:
    /// - `Ok(Self::Response)`: The generated response.
    /// - `Err(CompletionError)`: An error encountered during the request processing.
    fn completion(
        &mut self,
        request: Request,
    ) -> impl std::future::Future<Output = Result<Self::Response, CompletionError>> + Send;
}

/// An enumeration of possible errors that may occur during completion operations.
#[derive(Debug, thiserror::Error)]
pub enum CompletionError {
    /// A generic completion error.
    ///
    /// # Details
    /// - The error includes a message describing the cause of the failure.
    #[error("A normal completion error occurred: {0}")]
    Normal(String),
    #[error("An inference error occurred: {0}")]
    Inference(String),
    /// JSON error (e.g.: serialization, deserialization, etc.)
    #[error("JSON error: {0}")]
    JsonError(#[from] serde_json::Error),
}
