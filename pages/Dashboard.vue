<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
use([
    CanvasRenderer,
    PieChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent ,
    ToolboxComponent,
    LineChart,
]);


const barChart = {
    color: ['#5470C6', '#91CC75', '#EE6666'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
    },
    grid: {
        right: '17%'
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
        },
    },
    legend: {
        data: ['English', 'Italian', 'Arabic'],
        textStyle: {
            color: 'gray',
        },
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'English',
            position: 'right',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#5470C6'
                }
            },
            axisLabel: {
                formatter: '{value}'
            },
        },
        {
            type: 'value',
            name: 'Italian',
            position: 'right',
            alignTicks: true,
            offset: 50,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#91CC75'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: 'Arabic',
            position: 'right',
            alignTicks: true,
            offset: 100,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EE6666'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: 'Registrants',
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EE6666'
                }
            },
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name: 'English',
            type: 'bar',
            yAxisIndex: 1,
            data: [
                20, 49, 70, 232, 256, 767, 1356, 1622, 326, 200, 64, 33
            ]
        },
        {
            name: 'Italian',
            type: 'bar',
            yAxisIndex: 2,
            data: [
                26, 59, 90, 264, 287, 707, 1756, 1822, 487, 188, 60, 23
            ]
        },
        {
            name: 'Arabic',
            type: 'bar',
            yAxisIndex: 3,
            data: [20, 22, 33, 45, 63, 102, 203, 234, 230, 165, 120, 62]
        },
        {
            name: 'Registrants',
            type: 'line',
            data: [0, 22, 33, 45, 63, 102, 203, 234, 230, 165, 120, 62]
        },
    ],
}

const pieChart = {
    title: {
        text: 'Audiences',
        subtext: 'Age Categories',
        left: 'center',
        textStyle: {
            color: 'gray',
        },
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
            color: 'gray',
        },
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '40%',
            data: [
                { value: 484, name: 'Childs' },
                { value: 735, name: 'Teenagers' },
                { value: 580, name: 'Youngs' },
                { value: 1048, name: 'Students' },
                { value: 300, name: 'Adults' },
                { value: 300, name: 'Old Adults' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
            },
        }
    ]
}
</script>


<template>
    <div class="container" data-aos="fade-right" data-aos-duration="700">
        <div class="reports-box">
            <div class="report-card">
                <div class="key">
                    Courses
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0a.5.5 0 0 1 .473.337L9.046 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1.85l1.323 3.837a.5.5 0 1 1-.946.326L11.092 11H8.5v3a.5.5 0 0 1-1 0v-3H4.908l-1.435 4.163a.5.5 0 1 1-.946-.326L3.85 11H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4.954L7.527.337A.5.5 0 0 1 8 0M2 3v7h12V3z"/>
                    </svg>
                </div>
                <div class="value">23</div>
            </div>
            <div class="report-card">
                <div class="key">
                    Students
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917zM8 8.46 1.758 5.965 8 3.052l6.242 2.913z"/>
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46z"/>
                    </svg>
                </div>
                <div class="value">116</div>
            </div>
            <div class="report-card">
                <div class="key">
                    Online
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                </div>
                <div class="value">
                    11
                </div>
            </div>
            <div class="report-card">
                <div class="key">
                    Sales
                    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </div>
                <div class="value">67</div>
            </div>
        </div>
        <div class="box dashboard-box">
            <div class="left-side">
                <div class="card">
                    <div class="header">
                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
                        </svg>
                        Statistics of Registrants
                    </div>
                    <VChart :option="barChart" autoresize />
                </div>
            </div>
            <div class="right-side">
                <div class="card">
                    <div class="header">
                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                        </svg>
                        Courses
                    </div>
                    <VChart :option="pieChart" autoresize />
                </div>
            </div>
        </div>
        <div class="box dashboard-box">
            <div class="left-side">
                <div class="card">
                    <div class="header">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="svg" viewBox="0 0 16 16">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
                        </svg>
                        Tables
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Courses</th>
                                <th>Languages</th>
                                <th>Audiences</th>
                                <th>Categories</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>English</td>
                                <td>English</td>
                                <td>Students</td>
                                <td>A+</td>
                            </tr>
                            <tr>
                                <td>Italian</td>
                                <td>Italian</td>
                                <td>Childs</td>
                                <td>B</td>
                            </tr>
                            <tr>
                                <td>Arabic</td>
                                <td>Arabic</td>
                                <td>All</td>
                                <td>A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="right-side">
                <div class="card">
                    <div class="header">
                        <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
                        </svg>
                        Chat
                    </div>
                    <div class="chat-container">
                        <div class="messages">
                            <div class="him">
                                <img src="/profile.jpg">
                                <div class="text">Hi</div>
                            </div>
                            <div class="me">
                                <div class="text">Hello</div>
                                <img src="/profile.jpg">
                            </div>
                            <div class="him">
                                <img src="/profile.jpg">
                                <div class="text">Is this template really for free? That's unbelievable!</div>
                            </div>
                            <div class="me">
                                <div class="text">You better believe it!</div>
                                <img src="/profile.jpg">
                            </div>
                            <div class="him">
                                <img src="/profile.jpg">
                                <div class="text">Thank you</div>
                            </div>
                            <div class="me">
                                <div class="text">Your welcome</div>
                                <img src="/profile.jpg">
                            </div>
                        </div>
                        <div class="bottom">
                            <input type="text" placeholder="Write message...">
                            <button class="btn-save !w-16 !h-[46px]">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.chat-container {
    @apply
    w-full flex flex-col gap-2
}
.messages {
    @apply
    w-full h-[215px] flex flex-col border-[1px] border-background dark:border-darkBackground 
    rounded-md py-4 px-2 overflow-auto gap-4
}
.me, .him {
    @apply
    w-full h-[26px] flex items-center text-white gap-2
}
.me {
    @apply
    justify-end
}
.him {
    @apply
    justify-start
}
.me img, .him img {
    @apply
    w-8 aspect-square rounded-full
}
.me .text, .him .text {
    @apply
    rounded-md px-2 py-1 relative flex justify-center items-center text-[.8rem] md:text-[1.2rem]
    lg:text-[.8rem] min-[1700px]:text-[1.125rem]
}
.me .text::before, .him .text::before {
    content: '';
    --size: 7px;
    position: absolute;
    width: var(--size);
    height: var(--size);
}
.me .text::before {
    clip-path: polygon(0% 0%, 100% 45%, 100% 55%, 0% 100%);
    right: calc(var(--size) * -1);
    background-color: var(--primary);
}
.him .text::before {
    clip-path: polygon(0% 55%, 0% 45%, 100% 0%, 100% 100%);
    left: calc(var(--size) * -1);
    background-color: #475569;
}
.me .text {
    @apply
    rounded-md px-2 py-1 bg-primary
}
.him .text {
    @apply
    rounded-md px-2 py-1 bg-slate-600
}
.bottom {
    @apply
    w-full flex items-center justify-between gap-1
}
</style>