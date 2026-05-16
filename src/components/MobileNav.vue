<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Menu, X, Shield, Terminal, Trophy, Users, MessageSquare, Info, Send } from 'lucide-vue-next';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Handle body scroll locking and background blur
watch(isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.getElementById('main-content')?.classList.add('mobile-menu-blur');
  } else {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.getElementById('main-content')?.classList.remove('mobile-menu-blur');
  }
});

const closeMenu = () => {
  isOpen.value = false;
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
  document.body.style.touchAction = '';
});
</script>

<template>
  <div class="md:hidden">
    <!-- Toggle Button - Increased tap target and explicit z-index -->
    <button 
      @click="toggleMenu" 
      class="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white transition-colors relative z-[60] -mr-2"
      aria-label="Toggle Menu"
      aria-expanded="isOpen"
    >
      <Menu v-if="!isOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <!-- Overlay Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div v-if="isOpen" class="fixed inset-y-0 right-0 w-[85%] max-w-[400px] z-50 bg-background/98 backdrop-blur-2xl flex flex-col shadow-tactical">
        <!-- Close area (tapping outside items closes menu) -->
        <div class="fixed inset-0 z-[-1] bg-black/20" @click="closeMenu"></div>

        <div class="flex-grow flex flex-col justify-center px-8 space-y-6 pt-16">
          <div v-for="(item, index) in navItems" :key="item.name" 
               class="transform transition-all duration-500"
               :style="{ transitionDelay: `${index * 50}ms` }">
            <a 
              :href="item.href" 
              @click="closeMenu"
              class="flex items-center gap-5 py-4 text-3xl font-black tracking-tighter uppercase transition-colors group active:scale-95"
              :class="item.primary ? 'text-accent-purple' : 'text-white hover:text-accent-cyan'"
            >
              <div class="w-10 h-10 rounded-lg border border-stealth flex items-center justify-center bg-graphite group-hover:border-accent-cyan/50 transition-colors">
                <component :is="item.icon" class="w-5 h-5" :class="item.primary ? 'text-accent-purple' : 'text-zinc-500 group-hover:text-accent-cyan'" />
              </div>
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="p-8 border-t border-stealth bg-graphite/80 backdrop-blur-md">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-8 h-8 rounded-full bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20">
              <Shield class="w-4 h-4 text-accent-purple" />
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-300">Khaos Collective</span>
              <span class="text-[8px] font-mono text-accent-purple/60 uppercase tracking-widest">Protocol Active</span>
            </div>
          </div>
          <p class="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.15em] leading-relaxed">
            Unauthorized access strictly prohibited. <br/>
            Clearance Level 1 Required.
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.bg-background\/98 {
  background-color: rgba(5, 5, 5, 0.98);
}
</style>
