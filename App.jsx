cat > App.jsx << 'EOF'
import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          Learning Dashboard
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Ready!</h2>
            <p>Vite + React + TailwindCSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
EOF
