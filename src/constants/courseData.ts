export interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  status: 'locked' | 'in-progress' | 'completed';
  progress: number;
}

export const PM_MODULES: Module[] = [
  { id: 1, title: 'Initiation: Value & Stakeholders', description: 'Foundations of value delivery, business case architecture, and stakeholder identification based on PMBOK 7.', duration: '3h 30m', lessons: 9, status: 'completed', progress: 100 },
  { id: 2, title: 'Planning: The Planning Domain', description: 'Adaptive and predictive planning strategies, WBS construction, and system-thinking blueprints.', duration: '4h 15m', lessons: 4, status: 'in-progress', progress: 45 },
  { id: 3, title: 'Delivery: Procurement & Execution', description: 'Managing the delivery domain, value-based vendor selection, and agile execution frameworks.', duration: '3h 45m', lessons: 4, status: 'locked', progress: 0 },
  { id: 4, title: 'Uncertainty: Risk Management', description: 'Navigating ambiguity, opportunity management, and high-fidelity risk heat mapping.', duration: '3h 00m', lessons: 3, status: 'locked', progress: 0 },
  { id: 5, title: 'Measurement: Tracking & Costing', description: 'Outcome-based measurement, EVM, and performance dashboard architecture.', duration: '2h 45m', lessons: 4, status: 'locked', progress: 0 },
  { id: 6, title: 'Team: Staff & Leadership', description: 'Emotional intelligence, psychological safety, and self-organizing team dynamics.', duration: '2h 30m', lessons: 4, status: 'locked', progress: 0 },
  { id: 7, title: 'Quality: Standards & Fitness', description: 'Quality domain principles, Six Sigma integration, and fitness-for-purpose auditing.', duration: '2h 15m', lessons: 4, status: 'locked', progress: 0 },
  { id: 8, title: 'Integration: System Thinking', description: 'Holistic project integration, feedback loops, and organizational impact analysis.', duration: '3h 45m', lessons: 4, status: 'locked', progress: 0 },
  { id: 9, title: 'Timeline & Flow Efficiency', description: 'Cycle time optimization, bottleneck prediction, and delivery cadence.', duration: '2h 30m', lessons: 4, status: 'locked', progress: 0 },
  { id: 10, title: 'Change: Adaptability Domain', description: 'Mastering the change curve, behavioral adaptation, and institutional commitment.', duration: '4h 00m', lessons: 4, status: 'locked', progress: 0 },
  { id: 11, title: 'Exam Mastery: Practice & Review', description: 'Comprehensive practice exams, situational judgment strategy, and full tutorial review for PMP/CAPM success.', duration: '6h 30m', lessons: 4, status: 'locked', progress: 0 },
];
