import { Component } from "react";
import { AlertTriangle } from "lucide-react";

import GradientBackground from "./GradientBackground";
import GlassPanel from "./GlassPanel";
import Button from "./Button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("LectureLens AI crashed:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="relative min-h-screen text-white overflow-x-hidden">
        <GradientBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <GlassPanel
            className="max-w-md w-full p-10 flex flex-col items-center text-center gap-4"
            hover={false}
          >
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-400/20 flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-300" />
            </div>
            <h1 className="font-serif text-2xl text-white">Something went wrong</h1>
            <p className="text-sm text-white/50 leading-relaxed">
              LectureLens AI hit an unexpected error. Your data wasn't lost — try
              heading back to the homepage.
            </p>
            <Button variant="primary" onClick={this.handleReload} className="mt-2">
              Back to Home
            </Button>
          </GlassPanel>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
