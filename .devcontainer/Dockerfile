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

# Install OpenCode
RUN curl -fsSL https://opencode.ai/install | bash

RUN curl -fsSL https://claude.ai/install.sh | bash 

RUN npm install -g @modelcontextprotocol/server-filesystem
RUN npm install -g @modelcontextprotocol/server-memory

CMD ["bash"]

ENV PATH="/root/.local/bin:${PATH}"