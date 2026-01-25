# Skydive UI vs DarkStax K8s-SCN - Feature Comparison

## Executive Summary

This document compares the **Skydive UI** (open-source network topology analyzer) with **DarkStax K8s-SCN** (Kubernetes topology visualization) to identify missing UI functionalities in darkstax-k8s-scn.

**Comparison Date:** January 24, 2026  
**Skydive UI Repository:** https://github.com/skydive-project/skydive-ui  
**Skydive Main Project:** https://github.com/skydive-project/skydive

---

## 1. Overview

### Skydive UI
- **Purpose:** Real-time network topology and protocol analyzer
- **Focus:** Network flows, packet capture, multi-layer network analysis
- **Target:** Network infrastructure (VMs, containers, OpenStack, Kubernetes, Docker)
- **Query Language:** Gremlin graph traversal language
- **Backend:** Requires Skydive analyzer + agents, Elasticsearch for storage

### DarkStax K8s-SCN
- **Purpose:** Kubernetes topology visualization
- **Focus:** K8s resource relationships and status visualization
- **Target:** Kubernetes resources (Pods, Services, Deployments, ConfigMaps, etc.)
- **Query Language:** Basic search/filter (no graph query language)
- **Backend:** Static/mock data (no live backend integration yet)

---

## 2. Missing UI Functionalities in DarkStax K8s-SCN

### 🔴 **CRITICAL MISSING FEATURES**

#### 2.1 **Gremlin Query Interface**
**Skydive Has:**
- Interactive Gremlin query console in WebUI
- Real-time graph traversal queries
- Query builder/editor with syntax highlighting
- Query history and saved queries
- Example queries and documentation

**DarkStax Missing:**
- ❌ No graph query language support
- ❌ No query console/editor
- ❌ No advanced graph traversal capabilities
- ❌ Only basic text search filtering

**Impact:** HIGH - Limits advanced topology exploration and filtering

---

#### 2.2 **Flow Capture & Analysis**
**Skydive Has:**
- Traffic capture interface (start/stop captures)
- Flow visualization on topology
- Packet capture controls (sFlow, PCAP, afpacket, etc.)
- Capture filters and parameters
- Real-time flow metrics display
- Flow direction indicators (In/Out)
- Flow statistics and metrics:
  - ABBytes/BABytes (bidirectional byte counts)
  - ABPackets/BAPackets (packet counts)
  - Protocol information (Link, Network, Transport layers)
  - Source/Destination IP addresses
  - Port numbers
  - Timestamps (Start/Last)

**DarkStax Missing:**
- ❌ No traffic capture functionality
- ❌ No flow visualization
- ❌ No packet analysis
- ❌ No network metrics display
- ❌ No flow direction indicators
- ❌ No protocol analysis

**Impact:** CRITICAL - Core Skydive feature completely absent

---

#### 2.3 **Time-Based Topology Navigation**
**Skydive Has:**
- Timeline/time travel feature
- Historical topology views
- Ability to query topology at specific timestamps
- Temporal graph queries (`.At()` step)
- Full history of network topology changes
- Playback controls for topology evolution

**DarkStax Missing:**
- ❌ No timeline feature
- ❌ No historical data viewing
- ❌ No time-based queries
- ❌ Only shows current/static state

**Impact:** HIGH - Cannot analyze past states or troubleshoot historical issues

---

#### 2.4 **Live Data Integration & Real-time Updates**
**Skydive Has:**
- WebSocket connections for real-time updates
- Live topology changes reflected immediately
- Auto-refresh of topology graph
- Real-time flow updates
- Agent status monitoring
- Connection status indicators

**DarkStax Missing:**
- ❌ No WebSocket integration
- ❌ No real-time updates
- ❌ No live backend connection
- ❌ Currently uses static/mock data only
- ❌ No agent/analyzer connectivity

**Impact:** CRITICAL - Cannot monitor live infrastructure

---

#### 2.5 **Advanced Topology Visualization Controls**
**Skydive Has:**
- Multiple layout algorithms (force-directed, hierarchical, circular)
- Zoom controls (zoom in/out/fit)
- Pan and navigate large topologies
- Node grouping/clustering
- Expand/collapse node groups
- Filter by node type
- Highlight paths between nodes
- Shortest path visualization
- Full-screen mode

**DarkStax Has (Partial):**
- ✅ Basic layout selector (hierarchical lanes)
- ✅ Basic search/filter
- ✅ Zoom capability (via browser)
- ❌ No force-directed layout
- ❌ No node clustering
- ❌ No path highlighting
- ❌ No shortest path calculation
- ❌ No expand/collapse groups
- ❌ No full-screen mode

**Impact:** MEDIUM - Limited navigation for complex topologies

---

#### 2.6 **Node/Edge Details & Metadata**
**Skydive Has:**
- Detailed node metadata panel
- Complete property inspection
- Edge/relationship metadata
- Host information
- Network namespace details
- Interface statistics (RX/TX bytes, packets, errors)
- MTU, MAC address, IP addresses
- Docker/K8s labels and annotations
- OVSDB information
- Netlink data

**DarkStax Has (Partial):**
- ✅ Basic metadata panel (`MetadataPanel.tsx`)
- ✅ Node ID, type, label, category, status
- ✅ JSON metadata viewer (react-json-view)
- ✅ Position information
- ❌ No network statistics
- ❌ No interface metrics
- ❌ No relationship/edge details
- ❌ Limited K8s-specific metadata

**Impact:** MEDIUM - Basic info available but lacks depth

---

#### 2.7 **Capture Management UI**
**Skydive Has:**
- Capture creation wizard
- Capture list/management panel
- Start/stop/delete captures
- Capture status indicators
- Capture count per interface
- Gremlin-based capture targeting
- Capture type selection (sFlow, PCAP, etc.)
- BPF filter input
- Extra TCP metrics toggle
- Socket info collection toggle

**DarkStax Missing:**
- ❌ No capture management
- ❌ No capture controls
- ❌ No capture status
- ❌ Not applicable (no flow capture feature)

**Impact:** CRITICAL - Core Skydive feature absent

---

#### 2.8 **Flow Query & Filtering**
**Skydive Has:**
- Flow-specific Gremlin queries (`.Flows()` step)
- Flow filtering by:
  - Network addresses (Network.A, Network.B)
  - Transport ports (Transport.A, Transport.B)
  - Protocol (Link, Network, Transport layers)
  - Metrics (bytes, packets)
  - Time range (Start, Last)
  - Application layer
- Flow sorting (by metrics, time)
- Flow deduplication
- Flow aggregation

**DarkStax Missing:**
- ❌ No flow querying
- ❌ No flow filtering
- ❌ No flow-based search
- ❌ Not applicable (no flow data)

**Impact:** CRITICAL - Core Skydive feature absent

---

#### 2.9 **Multi-Node/Distributed Topology**
**Skydive Has:**
- Multi-agent topology aggregation
- Distributed architecture visualization
- Cross-host connectivity display
- Agent status per host
- Analyzer-agent relationship visualization
- Multi-datacenter support

**DarkStax Missing:**
- ❌ No multi-node support
- ❌ No distributed architecture
- ❌ Single-view topology only
- ❌ No host/agent concept

**Impact:** MEDIUM - Limits scalability visualization

---

#### 2.10 **Export & Reporting**
**Skydive Has:**
- Export topology as DOT format
- Export topology as JSON
- Export flows as JSON
- Screenshot/image export
- PCAP export for captured flows
- API access for programmatic export

**DarkStax Has (Partial):**
- ❌ No export functionality implemented
- ❌ No screenshot feature (mentioned in roadmap)
- ❌ No data export
- ❌ No API integration

**Impact:** MEDIUM - Cannot share or archive topology data

---

### 🟡 **MODERATE MISSING FEATURES**

#### 2.11 **Authentication & User Management**
**Skydive Has:**
- Login/logout functionality
- User authentication
- Endpoint selection on login
- Session management
- Multi-analyzer support

**DarkStax Missing:**
- ❌ No authentication
- ❌ No user management
- ❌ No login screen
- ❌ No endpoint configuration

**Impact:** LOW-MEDIUM - Required for production deployment

---

#### 2.12 **Packet Injection**
**Skydive Has:**
- Packet injection UI
- Custom packet creation
- Injection point selection
- Packet tracing through topology

**DarkStax Missing:**
- ❌ No packet injection
- ❌ Not applicable to K8s visualization

**Impact:** LOW - Not core to K8s topology visualization

---

#### 2.13 **Grafana Integration**
**Skydive Has:**
- Grafana datasource plugin
- Flow metrics in Grafana dashboards
- Time-series visualization
- Custom metric queries

**DarkStax Missing:**
- ❌ No Grafana integration
- ❌ No metrics dashboard
- ❌ No time-series data

**Impact:** MEDIUM - Limits observability integration

---

#### 2.14 **Alert/Notification System**
**Skydive Has:**
- Alert creation based on topology changes
- Alert creation based on flow metrics
- Notification system
- Webhook integration

**DarkStax Missing:**
- ❌ No alerting system
- ❌ No notifications
- ❌ No webhooks

**Impact:** MEDIUM - Cannot proactively monitor issues

---

#### 2.15 **CLI Integration Display**
**Skydive Has:**
- CLI command examples in UI
- Copy-to-clipboard for commands
- API endpoint documentation
- REST API explorer

**DarkStax Missing:**
- ❌ No CLI integration
- ❌ No API documentation in UI
- ❌ No command examples

**Impact:** LOW - Developer convenience feature

---

### 🟢 **FEATURES DARKSTAX HAS THAT SKYDIVE DOESN'T**

#### 2.16 **K8s-Specific Resource Templates**
**DarkStax Has:**
- Drag-and-drop K8s resource templates
- Resource menu panel with K8s icons
- Template-based resource creation
- K8s resource categories (Load, Service, Network, Config/Storage)

**Skydive:** Generic network topology (not K8s-specific UI)

---

#### 2.17 **Hierarchical Lane Layout**
**DarkStax Has:**
- Organized lane-based layout
- Category-based resource grouping
- Visual separation of resource types
- Dedicated lanes for Load, Service, Network, Config/Storage

**Skydive:** Force-directed or standard graph layouts

---

#### 2.18 **Status Legend with K8s States**
**DarkStax Has:**
- K8s-specific status colors
- Status legend tooltip
- Ready, Deploying, Active, Error, Terminated states
- Hexagonal status indicators

**Skydive:** Generic node states (up/down)

---

#### 2.19 **Modern UI/UX Design**
**DarkStax Has:**
- Modern React + TypeScript architecture
- Tailwind CSS styling
- Custom design tokens
- Macan font family
- Polished UI components
- Responsive design

**Skydive:** Older UI framework (legacy version)

---

## 3. Feature Comparison Matrix

| Feature Category | Skydive UI | DarkStax K8s-SCN | Priority Gap |
|-----------------|------------|------------------|--------------|
| **Query Language** | ✅ Gremlin | ❌ Basic search | 🔴 CRITICAL |
| **Flow Capture** | ✅ Full support | ❌ None | 🔴 CRITICAL |
| **Real-time Updates** | ✅ WebSocket | ❌ Static data | 🔴 CRITICAL |
| **Time Travel** | ✅ Historical views | ❌ None | 🔴 HIGH |
| **Topology Layouts** | ✅ Multiple | ⚠️ Hierarchical only | 🟡 MEDIUM |
| **Node Metadata** | ✅ Extensive | ⚠️ Basic | 🟡 MEDIUM |
| **Export/Screenshot** | ✅ Multiple formats | ❌ None | 🟡 MEDIUM |
| **Multi-node Support** | ✅ Distributed | ❌ Single view | 🟡 MEDIUM |
| **Authentication** | ✅ Yes | ❌ None | 🟡 MEDIUM |
| **Grafana Integration** | ✅ Yes | ❌ None | 🟡 MEDIUM |
| **Alerts** | ✅ Yes | ❌ None | 🟡 MEDIUM |
| **K8s Templates** | ❌ None | ✅ Yes | ✅ DarkStax Advantage |
| **Lane Layout** | ❌ None | ✅ Yes | ✅ DarkStax Advantage |
| **Modern UI** | ⚠️ Legacy | ✅ React/TS | ✅ DarkStax Advantage |
| **Status Legend** | ⚠️ Basic | ✅ K8s-specific | ✅ DarkStax Advantage |

---

## 4. Detailed Missing UI Components

### 4.1 **Query Console Component**
**What's Missing:**
- Text editor for Gremlin queries
- Syntax highlighting
- Auto-completion
- Query execution button
- Results display panel
- Query history dropdown
- Example queries library

**Where it would go:** New panel or modal in DarkStax

---

### 4.2 **Capture Control Panel**
**What's Missing:**
- "Start Capture" button
- Capture type selector (sFlow, PCAP, afpacket, etc.)
- Target selection (Gremlin query or node picker)
- BPF filter input
- Active captures list
- Capture status indicators
- Stop/Delete capture buttons

**Where it would go:** New panel or header controls

---

### 4.3 **Flow Visualization Overlay**
**What's Missing:**
- Flow arrows on topology
- Flow direction indicators
- Flow metrics tooltips
- Flow color coding (by protocol, volume, etc.)
- Animated flow paths
- Flow filtering controls

**Where it would go:** Overlay on `TopologyCanvas`

---

### 4.4 **Timeline/Time Travel Component**
**What's Missing:**
- Timeline scrubber
- Time range selector
- Play/pause controls
- Speed controls
- Timestamp display
- Historical state indicator

**Where it would go:** Bottom panel or new timeline bar

---

### 4.5 **Connection Status Indicator**
**What's Missing:**
- Analyzer connection status
- Agent status per node
- WebSocket connection indicator
- Reconnection controls
- Error messages for connection issues

**Where it would go:** Header or status bar

---

### 4.6 **Advanced Filter Panel**
**What's Missing:**
- Multi-criteria filtering
- Filter by node properties
- Filter by relationships
- Filter by metrics
- Save/load filter presets
- Complex boolean logic (AND/OR/NOT)

**Where it would go:** Expanded search panel

---

### 4.7 **Export Dialog**
**What's Missing:**
- Export format selector (JSON, DOT, PNG, SVG)
- Export scope selector (full topology, selection, filtered)
- Download button
- Copy to clipboard option
- PCAP export for flows

**Where it would go:** Modal dialog from menu

---

### 4.8 **Metrics Dashboard**
**What's Missing:**
- Flow metrics charts
- Bandwidth graphs
- Packet rate graphs
- Protocol distribution
- Top talkers
- Time-series visualizations

**Where it would go:** New dashboard view or panel

---

## 5. UI Architecture Differences

### Skydive UI Architecture
```
┌─────────────────────────────────────────┐
│ Header (Login, Endpoint, Controls)     │
├─────────────────────────────────────────┤
│ ┌─────────┬─────────────────┬─────────┐│
│ │ Query   │  Topology       │ Capture ││
│ │ Console │  Visualization  │ Panel   ││
│ │         │                 │         ││
│ │ Gremlin │  Force-directed │ Active  ││
│ │ Editor  │  Graph          │ Captures││
│ │         │                 │         ││
│ │ Results │  Zoom/Pan       │ Metrics ││
│ └─────────┴─────────────────┴─────────┘│
├─────────────────────────────────────────┤
│ Timeline / Time Travel Controls        │
└─────────────────────────────────────────┘
```

### DarkStax K8s-SCN Architecture
```
┌─────────────────────────────────────────┐
│ Header (Path, Name, Layout, Search)    │
├─────────────────────────────────────────┤
│ ┌─────────────────┬─────────┬─────────┐│
│ │  Topology       │ Resource│Metadata ││
│ │  Canvas         │ Menu    │ Panel   ││
│ │                 │         │ (slide) ││
│ │  Hierarchical   │ K8s     │         ││
│ │  Lanes          │ Icons   │ Node    ││
│ │                 │         │ Details ││
│ │  - Load         │ Drag &  │         ││
│ │  - Service      │ Drop    │         ││
│ │  - Network      │         │         ││
│ │  - Config       │         │         ││
│ └─────────────────┴─────────┴─────────┘│
├─────────────────────────────────────────┤
│ Bottom Panel (Monitor, Visualize, Info)│
└─────────────────────────────────────────┘
```

---

## 6. Recommendations

### 6.1 **High Priority Additions**
1. **Live Data Integration**
   - Implement WebSocket connection to K8s API
   - Real-time resource updates
   - Live status changes

2. **Advanced Query/Filter**
   - Implement graph query language (Gremlin or custom)
   - Complex filtering logic
   - Saved queries/filters

3. **Export Functionality**
   - Screenshot capture
   - JSON export
   - Topology sharing

4. **Time-based Navigation**
   - Historical state viewing
   - Resource change timeline
   - Event history

### 6.2 **Medium Priority Additions**
1. **Enhanced Metadata**
   - K8s resource metrics (CPU, memory, network)
   - Pod logs integration
   - Event stream display

2. **Multi-cluster Support**
   - Multiple K8s cluster visualization
   - Cross-cluster relationships
   - Cluster selector

3. **Authentication & Security**
   - User login
   - RBAC integration
   - Secure API access

### 6.3 **Low Priority (Nice to Have)**
1. **Grafana Integration**
   - Metrics dashboard embedding
   - Custom metric queries

2. **Alert System**
   - Resource state alerts
   - Threshold-based notifications

3. **CLI Integration**
   - kubectl command suggestions
   - API examples

---

## 7. Conclusion

### Key Findings

**DarkStax K8s-SCN** is a **modern, K8s-focused topology visualization tool** with excellent UI/UX design and K8s-specific features. However, it lacks several **core Skydive UI functionalities**:

#### Critical Gaps:
1. ❌ **No Gremlin/graph query language**
2. ❌ **No flow capture or network analysis**
3. ❌ **No real-time data integration**
4. ❌ **No time-based topology navigation**

#### Moderate Gaps:
5. ❌ **Limited topology layout options**
6. ❌ **No export/screenshot functionality**
7. ❌ **No authentication system**
8. ❌ **No multi-node/distributed support**

#### DarkStax Advantages:
1. ✅ **Modern React/TypeScript architecture**
2. ✅ **K8s-specific resource templates**
3. ✅ **Hierarchical lane layout**
4. ✅ **Better UI/UX design**
5. ✅ **K8s-focused status indicators**

### Strategic Direction

**If the goal is to match Skydive's capabilities:**
- Focus on implementing real-time data integration
- Add advanced query/filtering capabilities
- Implement flow/network analysis features

**If the goal is K8s-specific visualization:**
- Continue enhancing K8s-specific features
- Add live K8s API integration
- Focus on K8s resource relationships and dependencies
- Add K8s-specific metrics and monitoring

**DarkStax K8s-SCN is better positioned as a K8s-native topology visualizer** rather than a direct Skydive replacement, as Skydive focuses heavily on network flow analysis which may not be the primary goal for K8s topology visualization.

---

## 8. References

- **Skydive UI:** https://github.com/skydive-project/skydive-ui
- **Skydive Main:** https://github.com/skydive-project/skydive
- **Skydive Documentation:** http://skydive.network/documentation
- **Skydive Gremlin API:** http://skydive.network/documentation/api-gremlin
- **DarkStax K8s-SCN:** `/Users/ppatel/Documents/dstax-workspace/ui-elements/ui-lego/darkstax-k8s-scn/`
