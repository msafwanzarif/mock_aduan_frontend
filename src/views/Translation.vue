<template>
  <div class="container">
    <h1 class="text-center">{{ $t('contoh1') }}</h1>
    <h1 class="text-center">{{ $t('contoh2') }}</h1>
    <div class="d-flex align-items-center justify-content-center m-3">
      <button class="btn btn-primary mx-2" @click="$i18n.locale = 'ms'">Tukar ke Bahasa</button>
      <button class="btn btn-primary mx-2" @click="$i18n.locale = 'en'">Change to English</button>
      <button class="btn btn-primary mx-2" @click="$i18n.locale = 'jp'">Nihongo Kudasai</button>
    </div>
  </div>
</template>