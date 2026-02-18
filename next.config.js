cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['your-supabase-project.supabase.co'],
  },
  experimental: {
    turbo: {
      root: "/workspaces/Learning./my-app"
    }
  }
}

module.exports = nextConfig
EOF
