<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Search, Command, FileText, Users, Trophy, Home, X } from 'lucide-vue-next';

const isOpen = ref(false);
const searchQuery = ref('');

const actions = [
  { id: 'home', title: 'Home', icon: Home, href: '/' },
  { id: 'writeups', title: 'Writeups', icon: FileText, href: '/writeups' },
  { id: 'events', title: 'Events', icon: Trophy, href: '/events' },
  { id: 'rankings', title: 'Rankings', icon: Trophy, href: '/rankings' },
  { id: 'team', title: 'Team', icon: Users, href: '/team' },
];

const filteredActions = computed(() => {
  if (!searchQuery.value) return actions;
  return actions.filter(action => 
    action.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggle = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    searchQuery.value = '';
    setTimeout(() => document.getElementById('command-input')?.focus(), 50);
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    toggle();
  }
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false;
  }
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="isOpen = false" />
    
    <!-- Palette -->
    <div class="relative w-full max-w-xl bg-graphite border border-stealth rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="flex items-center px-4 py-4 border-b border-stealth">
        <Search class="w-5 h-5 text-zinc-500 mr-3" />
        <input
          id="command-input"
          v-model="searchQuery"
          type="text"
          placeholder="Type a command or search..."
          class="w-full bg-transparent border-none text-zinc-100 placeholder-zinc-500 focus:ring-0 text-sm outline-none"
        />
        <div class="flex items-center gap-1 px-1.5 py-0.5 rounded border border-stealth bg-zinc-900 text-[10px] text-zinc-500 font-mono">
          <kbd>ESC</kbd>
        </div>
      </div>

      <div class="max-h-[300px] overflow-y-auto p-2">
        <div v-if="filteredActions.length > 0">
          <a
            v-for="action in filteredActions"
            :key="action.id"
            :href="action.href"
            class="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 group transition-colors"
          >
            <div class="flex items-center gap-3">
              <component :is="action.icon" class="w-4 h-4 text-zinc-500 group-hover:text-accent-purple" />
              <span class="text-sm font-medium text-zinc-300 group-hover:text-white">{{ action.title }}</span>
            </div>
            <div class="text-[10px] text-zinc-600 font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100">
              Jump to
            </div>
          </a>
        </div>
        <div v-else class="p-8 text-center text-zinc-500 text-sm">
          No results found for "{{ searchQuery }}"
        </div>
      </div>

      <div class="px-4 py-3 border-t border-stealth bg-zinc-900/50 flex items-center justify-between text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5">
            <kbd class="px-1 py-0.5 rounded border border-stealth">↑↓</kbd>
            <span>Navigate</span>
          </div>
          <div class="flex items-center gap-1.5">
            <kbd class="px-1 py-0.5 rounded border border-stealth">ENTER</kbd>
            <span>Select</span>
          </div>
        </div>
        <div class="flex items-center gap-1.5">
          <Command class="w-3 h-3" />
          <span>Khaos-v1.0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: animate-in 0.2s ease-out;
}

@keyframes animate-in {
  from { opacity: 0; transform: scale(0.95) translateY(-10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
