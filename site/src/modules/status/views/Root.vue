<template>
    <router-view @updateStatus="(args) => $emit('updateStatus', args)" />
</template>
