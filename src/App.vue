<template>
  <div id="app">
    <SafeHeader></SafeHeader>
    <SafeList></SafeList>
    <SafeFooter></SafeFooter>
  </div>
</template>

<script>
import SafeHeader from './components/SafeHeader';
import SafeList from './components/SafeList';
import SafeFooter from './components/SafeFooter';

export default {
  name: 'App',
  components: {
    SafeHeader,
    SafeList,
    SafeFooter,
  },
};
</script>

<style lang="scss">
@import './assets/styles/reset.css';
@import './assets/styles/styles.scss';
</style>
