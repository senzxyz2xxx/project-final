import { UserAccount, SystemTabKey, SiteKey } from '../types/dashboard';

const ALL_SYSTEMS: SystemTabKey[] = ['overview', 'warroom', 'finance', 'attendance', 'vms', 'hr', 'crm', 'cms'];
const ALL_SITES: SiteKey[] = ['all', 'hq', 'muangthong', 'phuket', 'chiangmai'];

export const defaultUsers: UserAccount[] = [
  {
    id: 'u1',
    name: 'Worapol Sittigrilard',
    email: 'worapol@rittha.co.th',
    org: 'Rittha Co., Ltd.',
    role: 'user',
    status: 'active',
    allowedSites: ['hq', 'muangthong'],
    allowedSystems: ['overview', 'vms', 'attendance', 'hr'],
  },
  {
    id: 'u2',
    name: 'Kamolchanok Luechawong',
    email: 'kamolchanok@rittha.co.th',
    org: 'Rittha Co., Ltd.',
    role: 'user',
    status: 'active',
    allowedSites: ['hq'],
    allowedSystems: ['overview', 'vms', 'hr'],
  },
  {
    id: 'u3',
    name: 'Piyawat Saengthong',
    email: 'piyawat@rittha.co.th',
    org: 'Rittha Co., Ltd.',
    role: 'user',
    status: 'active',
    allowedSites: ALL_SITES,
    allowedSystems: ALL_SYSTEMS,
  },
  {
    id: 'u4',
    name: 'Chonticha Meesuk',
    email: 'chonticha@thaipattana.co.th',
    org: 'ThaiPattana Construction',
    role: 'user',
    status: 'inactive',
    allowedSites: ['hq'],
    allowedSystems: ['overview', 'finance'],
  },
];

export const ALL_SYSTEMS_LIST = ALL_SYSTEMS;
export const ALL_SITES_LIST = ALL_SITES;
