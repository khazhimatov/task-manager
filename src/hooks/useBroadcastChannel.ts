import React, { useEffect } from 'react'
import { BroadcastChannel } from 'broadcast-channel'

export interface MessageEvent<T> extends globalThis.MessageEvent {
  readonly data: T;
}

export function useBroadcastChannel<T>(channelId: string,
  onmessage?: (ev: MessageEvent<T>) => void): [(message: T) => void] {
  const channel = React.useRef<BroadcastChannel>(null!)

  useEffect(() => {
    channel.current = new BroadcastChannel(channelId)

    if (onmessage) {
      channel.current.onmessage = onmessage
    }

    return () => {
      if (channel.current) {
        void channel.current.close()
      }
    }
  }, [channelId, onmessage])

  const post = (message: T): Promise<void> => channel.current?.postMessage(message)
  return [post]
}
