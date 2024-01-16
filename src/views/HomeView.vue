<template>
    <div class="">
        <ChartView route="http://192.168.1.133:8001/api/charts/sale" chart="line"></ChartView>
    </div>
    <div>
        <BarChart route="http://192.168.1.133:8001/api/charts/sale" chart="bar" ></BarChart>
    </div>
</template>

<script>
import ChartView from '@/components/ChartView.vue';
import BarChart from '@/components/BarChart.vue';



export default {
    components: { ChartView, BarChart },
};
</script>
