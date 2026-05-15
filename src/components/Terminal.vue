<script setup lang="ts">
import { Terminal as TerminalIcon, Shield, Zap, Activity } from 'lucide-vue-next';

const systemStats = [
  { label: 'Uplink', value: '1.2Gbps', icon: Zap },
  { label: 'Encryption', value: 'AES-256-GCM', icon: Shield },
  { label: 'Status', value: 'Stealth', icon: Activity },
];
</script>

<template>
  <div class="w-full max-w-2xl rounded-lg border border-stealth bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-stealth bg-zinc-900/50">
      <div class="flex items-center gap-2">
        <TerminalIcon class="w-4 h-4 text-zinc-500" />
        <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-500">khaos-tactical-os v2.4.0</span>
      </div>
      <div class="flex gap-1.5">
        <div class="w-2.5 h-2.5 rounded-full bg-zinc-800" />
        <div class="w-2.5 h-2.5 rounded-full bg-zinc-800" />
        <div class="w-2.5 h-2.5 rounded-full bg-zinc-700" />
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 font-mono text-xs space-y-4">
      <div class="flex gap-2">
        <span class="text-accent-purple">guest@khaos:~$</span>
        <span class="text-zinc-100">./recon_target.sh --all</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div v-for="stat in systemStats" :key="stat.label" class="p-3 rounded-md border border-stealth bg-white/[0.02]">
          <div class="flex items-center gap-2 mb-1">
            <component :is="stat.icon" class="w-3 h-3 text-accent-cyan" />
            <span class="text-[10px] text-zinc-500 uppercase tracking-wider">{{ stat.label }}</span>
          </div>
          <div class="text-zinc-100 font-bold">{{ stat.value }}</div>
        </div>
      </div>

      <div class="space-y-1">
        <div class="text-zinc-500">[SYSTEM] Scanning ports...</div>
        <div class="text-accent-cyan flex gap-2">
          <span>80/tcp</span>
          <span class="text-zinc-600">|</span>
          <span>OPEN</span>
          <span class="text-zinc-600">|</span>
          <span>nginx/1.18.0</span>
        </div>
        <div class="text-accent-cyan flex gap-2">
          <span>443/tcp</span>
          <span class="text-zinc-600">|</span>
          <span>OPEN</span>
          <span class="text-zinc-600">|</span>
          <span>OpenSSL/1.1.1f</span>
        </div>
        <div class="text-accent-purple animate-pulse">_</div>
      </div>
    </div>
  </div>
</template>
