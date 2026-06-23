import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ink-950 text-white p-8">
          <div className="text-center max-w-md">
            <div className="display-md text-gradient-gold">Something went wrong</div>
            <p className="text-white/60 mt-4">
              We hit a snag. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary mt-6 inline-flex"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
