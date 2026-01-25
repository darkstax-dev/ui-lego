import { useEffect, useRef, useCallback } from 'react';
import { useTopologyStore } from '@/store/topologyStore';
import { WebSocketClient } from '@/lib/websocket/WebSocketClient';
import { MessageHandler } from '@/lib/websocket/MessageHandler';

export function useWebSocket(url: string | undefined) {
  const clientRef = useRef<WebSocketClient | null>(null);
  const handlerRef = useRef<MessageHandler | null>(null);
  
  const { 
    setNodes, 
    setEdges, 
    addNode, 
    updateNode, 
    removeNode,
    addEdge,
    removeEdge,
    setConnected 
  } = useTopologyStore();

  const connect = useCallback(async () => {
    if (!url) return;

    try {
      clientRef.current = new WebSocketClient(url);
      
      handlerRef.current = new MessageHandler({
        onSyncReply: (nodes, edges) => {
          console.log(`Received sync: ${nodes.length} nodes, ${edges.length} edges`);
          setNodes(nodes);
          setEdges(edges);
        },
        onNodeAdded: (node) => {
          console.log('Node added:', node.id);
          addNode(node);
        },
        onNodeUpdated: (node) => {
          console.log('Node updated:', node.id);
          updateNode(node.id, node.data);
        },
        onNodeDeleted: (nodeId) => {
          console.log('Node deleted:', nodeId);
          removeNode(nodeId);
        },
        onEdgeAdded: (edge) => {
          console.log('Edge added:', edge.id);
          addEdge(edge);
        },
        onEdgeDeleted: (edgeId) => {
          console.log('Edge deleted:', edgeId);
          removeEdge(edgeId);
        }
      });

      clientRef.current.addMessageHandler((message) => {
        handlerRef.current?.handle(message);
      });

      await clientRef.current.connect();
      setConnected(true);
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      setConnected(false);
    }
  }, [url, setNodes, setEdges, addNode, updateNode, removeNode, addEdge, removeEdge, setConnected]);

  useEffect(() => {
    if (url) {
      connect();
    }

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        setConnected(false);
      }
    };
  }, [url, connect, setConnected]);

  return {
    isConnected: clientRef.current?.isConnected() || false,
    reconnect: connect
  };
}
