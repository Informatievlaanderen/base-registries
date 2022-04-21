<template>
    <div>
        <router-view @updateStatus="(args) => $emit('updateStatus', args)" />
    </div>
</template>
