import { GridNode, StressLevel, GridMetrics, NodeAction } from './types';

export function computeGridStep(
  nodes: GridNode[],
  stress: StressLevel,
  timeStep: number
): { updatedNodes: GridNode[]; actions: NodeAction[]; metrics: GridMetrics } {
  let totalLoad = 0;
  let totalGen = 0;
  const actions: NodeAction[] = [];

  const updatedNodes = nodes.map((node) => {
    if (node.isolated) {
      return { ...node, loadKW: 0, genKW: 0, status: 'OFFLINE' as const };
    }

    let loadMultiplier = 1.0;
    let genMultiplier = 1.0;

    // Apply stress factors
    if (stress === 'HIGH_DEMAND') {
      loadMultiplier = 1.35 + Math.sin(timeStep * 0.2) * 0.1;
    } else if (stress === 'CYBER_ATTACK') {
      loadMultiplier = 1.5 + (Math.random() - 0.5) * 0.4;
      genMultiplier = 0.8;
    } else if (stress === 'LINE_TRIP') {
      genMultiplier = 0.6;
    }

    const currentLoad = Math.round(node.baseLoad * loadMultiplier);
    const currentGen = Math.round(node.baseGen * genMultiplier);

    totalLoad += currentLoad;
    totalGen += currentGen;

    let status: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'OFFLINE' = 'HEALTHY';
    if (currentLoad > currentGen * 1.4) {
      status = 'CRITICAL';
      actions.push({
        id: `ACT-${Date.now()}-${node.id}`,
        nodeId: node.id,
        actionType: 'SHED_LOAD',
        timestamp: new Date().toLocaleTimeString(),
        reason: `Frequency deviation mitigation on ${node.name}`,
      });
    } else if (currentLoad > currentGen * 1.15) {
      status = 'WARNING';
    }

    return {
      ...node,
      loadKW: currentLoad,
      genKW: currentGen,
      status,
    };
  });

  // Calculate global frequency drift
  const genToLoadRatio = totalLoad > 0 ? totalGen / totalLoad : 1.0;
  let frequencyHz = 50.0 + (genToLoadRatio - 1.0) * 1.5;
  frequencyHz = Math.max(47.5, Math.min(52.5, Number(frequencyHz.toFixed(2))));

  const voltageRMS = Math.round(230 * Math.min(1.05, Math.max(0.85, genToLoadRatio)));
  const globalScore = Math.max(0, Math.min(100, Math.round(100 - Math.abs(50.0 - frequencyHz) * 20)));

  return {
    updatedNodes,
    actions,
    metrics: {
      frequencyHz,
      voltageRMS,
      globalScore,
      totalGenKW: totalGen,
      totalLoadKW: totalLoad,
    },
  };
}
