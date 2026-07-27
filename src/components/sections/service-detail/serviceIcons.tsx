import {
  Info, Target, Wrench, Award,
  Plane, ScanLine, Mountain, Map, Layers, Radar, Satellite, Boxes,
  Building2, Box, Cable, ShieldCheck,
  SignpostBig, Network, PanelsTopLeft, MonitorPlay, LayoutGrid, Users, Camera,
  MessageSquare, MapPin, ClipboardList, Ruler, HardHat, PackageCheck,
  Landmark, Building, Zap, Cpu, Bus, Sparkles, Shield, Route,
  type LucideIcon,
} from "lucide-react";

/** Maps the string icon keys used in src/data/services.ts to lucide icons. */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  // service / discipline
  survey: Radar, civil: Building2, its: Route, av: MonitorPlay,
  // overview blocks
  what: Info, why: Target, solve: Wrench, afaq: Award,
  // survey capabilities
  uav: Plane, lidar: ScanLine, topo: Mountain, land: Map, gis: Layers,
  gpr: Radar, geodetic: Satellite, twin: Boxes,
  // civil capabilities
  steel: Building2, rcc: Box, trench: Cable, utility: Cable, earth: Mountain, corrosion: ShieldCheck,
  // its capabilities
  anpr: Camera, vms: SignpostBig, radar: Radar, gantry: Building2, tmc: Network, om: Wrench,
  // av capabilities
  noc: PanelsTopLeft, dvled: MonitorPlay, avip: Network, cabling: Cable, videowall: LayoutGrid, uc: Users,
  // process
  consultation: MessageSquare, assessment: MapPin, planning: ClipboardList,
  engineering: Ruler, execution: HardHat, qa: ShieldCheck, delivery: PackageCheck,
  // industries
  government: Landmark, municipalities: Building, utilities: Zap, smartcities: Cpu,
  mega: Building2, transportation: Bus, entertainment: Sparkles, defense: Shield,
};

export function serviceIcon(key: string): LucideIcon {
  return SERVICE_ICONS[key] ?? Sparkles;
}
