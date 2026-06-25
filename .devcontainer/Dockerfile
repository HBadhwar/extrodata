FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    ca-certificates \
    ruby-full \
    build-essential \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

RUN gem install jekyll bundler

# Pin to last working version before system role bug
RUN npm install -g @anthropic-ai/claude-code@2.1.153

# Install OpenCode
RUN curl -fsSL https://opencode.ai/install | bash

RUN npm install -g @modelcontextprotocol/server-filesystem
RUN npm install -g @modelcontextprotocol/server-memory

# Disable Claude Code auto-updates permanently
RUN mkdir -p /root/.claude && echo '{"env":{"DISABLE_AUTOUPDATER":"1","DISABLE_UPDATES":"1"}}' > /root/.claude/settings.json

CMD ["bash"]