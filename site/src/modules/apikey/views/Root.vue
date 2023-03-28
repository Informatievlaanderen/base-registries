<template>
    <div>
        <router-view
            @pageLoaded="(args) => $emit('pageLoaded', args)"
            @updateStatus="(args) => $emit('updateStatus', args)"
        />
    </div>
</template>