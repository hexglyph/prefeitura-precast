import { openai } from "@ai-sdk/openai"

// Azure OpenAI provider configuration for Vercel AI SDK
// Required envs:
// - AZURE_OPENAI_ENDPOINT (e.g., https://<resource>.openai.azure.com)
// - AZURE_OPENAI_API_KEY
// - AZURE_OPENAI_DEPLOYMENT (deployment name)
// - AZURE_OPENAI_API_VERSION (default 2024-06-01)

export const azure = openai({
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  // Include deployment in baseURL for Azure routing
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
  headers: {
    "api-key": process.env.AZURE_OPENAI_API_KEY!,
  },
  query: {
    "api-version": process.env.AZURE_OPENAI_API_VERSION || "2024-06-01",
  },
})
