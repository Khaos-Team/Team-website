import { Trophy, Zap, Activity, Crown, Star, Shield } from 'lucide-vue-next';

export const achievementStats = [
	{ label: 'Operations', value: '1', icon: Trophy, trend: 'Vetted', color: 'text-yellow-500' },
	{ label: 'Points Secured', value: '1,250', icon: Zap, trend: '+1.2k', color: 'text-accent-purple' },
	{ label: 'Critical Breaches', value: '14', icon: Activity, trend: 'Confirmed', color: 'text-white' },
];

export const hallOfFame = [
	{ 
		rank: 1, 
		name: 'PwnZone CTF', 
		year: '2026',
		award: 'System Compromise', 
		description: 'Successfully identified and exploited critical vulnerabilities within the target environment.',
		icon: Crown,
		color: 'from-yellow-500/20 to-transparent'
	}
];

export const missionLogs = [
	{ date: '2026.05.15', op: 'PwnZone CTF', result: 'Success', status: 'SUCCESS' },
];

export const upcomingOperations = [
	{ date: 'TBD', op: 'Major International CTF', objective: 'Vulnerability Research', status: 'STANDBY' },
];
