<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, Shield, Terminal, Trophy, Users, MessageSquare, Info, Send } from 'lucide-vue-next';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
};

const navItems = [
  { name: 'About', href: '/about', icon: Info },
  { name: 'Writeups', href: '/writeups', icon: Terminal },
  { name: 'Events', href: '/events', icon: MessageSquare },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Join', href: '/join', icon: Send, primary: true },
];

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="md:hidden">
    <!-- Toggle Button -->
    <button 
      @click="toggleMenu" 
      class="p-2 text-zinc-400 hover:text-white transition-colors relative z-50"
      aria-label="Toggle Menu"
    >
      <Menu v-if="!isOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <!-- Overlay Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div v-if="isOpen" class="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col">
        <div class="flex-grow flex flex-col justify-center px-8 space-y-8">
          <div v-for="(item, index) in navItems" :key="item.name" 
               class="transform transition-all duration-500"
               :style="{ transitionDelay: `${index * 50}ms` }">
            <a 
              :href="item.href" 
              @click="closeMenu"
              class="flex items-center gap-4 text-3xl font-black tracking-tighter uppercase transition-colors"
              :class="item.primary ? 'text-accent-purple' : 'text-white hover:text-accent-cyan'"
            >
              <component :is="item.icon" class="w-6 h-6" :class="item.primary ? 'text-accent-purple' : 'text-zinc-500'" />
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="p-8 border-t border-stealth bg-graphite/50">
          <div class="flex items-center gap-2 mb-2">
            <Shield class="w-4 h-4 text-accent-purple" />
            <span class="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Khaos Collective</span>
          </div>
          <p class="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
            Security Clearance Level 1 Required
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.bg-background\/95 {
  background-color: rgba(5, 5, 5, 0.95);
}
</style>
