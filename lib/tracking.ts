// Type definitions for umami
// Project: https://github.com/mikecao/umami
// Definitions by: Pau Kraft <https://github.com/derzerstampfer>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

//Based on https://umami.is/docs/tracker-functions
declare global {
  namespace umami {
    interface umami {
      // event tracking with optional data
      track(event_name: string, event_data?: object): void
      // page view tracking
      track(): void
    }
  }
}

// Add this line to tell TypeScript that the global umami object exists and has the correct type
declare const umami: umami.umami

export const track = (props?: { event_name: string; event_data?: object }) => {
  if (!props) return umami.track()
  return umami.track(props.event_name, props.event_data)
}
