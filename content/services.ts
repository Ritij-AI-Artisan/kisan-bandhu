export type ServiceIcon = 'sprout' | 'tractor' | 'users' | 'scan' | 'warehouse' | 'briefcase';

export const SERVICES: { key: string; icon: ServiceIcon; photo: string; href: string }[] = [
  { key: 's1', icon: 'sprout', photo: 'services/inputs-seedling', href: '/products' },
  { key: 's2', icon: 'tractor', photo: 'services/tractor', href: '/farmers#booking' },
  { key: 's3', icon: 'users', photo: 'services/climber', href: '/farmers#booking' },
  { key: 's4', icon: 'scan', photo: 'services/leaf-disease', href: '/technology#crop-doctor' },
  { key: 's5', icon: 'warehouse', photo: 'services/hub-copra', href: '/hubs' },
  { key: 's6', icon: 'briefcase', photo: 'services/jobs-operator', href: '/hubs#hub-partner' },
];
