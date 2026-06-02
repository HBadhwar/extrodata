FROM node:20-slim

# Install basic tools + Ruby for Jekyll compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    ca-certificates \
    ruby-full \
    build-essential \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Install Jekyll globally
RUN gem install jekyll bundler

# Install OpenCode
RUN curl -fsSL https://opencode.ai/install | bash

# Install essential MCP servers for the web agent
RUN npm install -g @modelcontextprotocol/server-filesystem
RUN npm install -g @modelcontextprotocol/server-memory

CMD ["bash"]