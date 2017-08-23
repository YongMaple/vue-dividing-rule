<template>
<div class="container" ref="container">
    <div class="ruler_container" id="ruler_container">
        <div class="interval" :style="{ width: 5 * interval + 'px'}" v-for="n in half">
            <div class="left_mask" :style="{ width: mask_width + 'px' }" v-if="n == 1"></div>
            <div class="scale" v-for="i in interval"></div>
        </div>
        <div class="interval" :style="{ width: 5 * interval + 'px'}" v-for="n in count">
            <div class="scale" v-for="i in interval"></div>
            <span class="number">
					{{ min + interval * (n - 1) }}
				</span>
            <span class="after_number" v-if="n == count">{{ min + interval * n }}</span>
        </div>
        <div class="interval" :style="{ width: 5 * interval + 'px'}" v-for="n in half">
            <div class="scale" v-for="i in interval"></div>
            <div class="right_mask" :style="{ width: mask_width + 'px' }" v-if="n == half"></div>
        </div>
    </div>
    <div class="pointer"></div>
</div>
</template>
<script>
export default {
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 150
        },
        interval: {
            type: Number,
            default: 10
        }
    },
    computed: {
        count() {
            return Math.ceil((this.max - this.min) / this.interval)
        }
    },
    methods: {
        getValue(v) {
            return Math.ceil((v - this.width_diff) / 5) + this.min
        },
        getApproximate(val) {
			let arr = this.values
            if (arr.indexOf(val) < 0) {
                arr.push(val)
                let index = arr.sort((a,b)=>{return a-b}).indexOf(val)
                let a = arr[index - 1]
                let b = arr[index + 1]
                return Math.abs(val - a) > Math.abs(val - b) ? b : a
            }else{
				return val
			}
        }
    },
    data() {
        return {
            half: 0,
            mask_width: 0,
            width_diff: 0,
            ruler_container_width: 0,
            values: [],
			scrollLeft: 0,
			timer: 0
        }
    },
    mounted() {
		// 获取刻度尺的宽度
        let width = this.$refs.container.getBoundingClientRect().width
		// 刻度尺一半宽度需要多少个大区间，向上取整
		this.half = Math.ceil(width / 2 / (this.interval * 5))
		// 计算渐变蒙层的宽度
        this.mask_width = this.half * this.interval * 5
		// 计算渐变蒙层和实际一半宽度的差额，该值也用于调整计算min值的位置
		this.width_diff = Math.abs(width / 2 - this.mask_width)
		// 获取最大值时scrollLeft的值
		let max = this.count * this.interval * 5 + this.width_diff
		// 将所有值对应的scrollLeft值存在values中
        for (let i = this.min; i <= this.max; i++) {
			let v = this.width_diff + (i * 5)
            this.values.push(v)
        }
		// 获取刻度尺容器
		let dom = document.querySelectorAll(".ruler_container")[0]
		// 设置初始化时刻度指向min值的位置
		this.scrollLeft = dom.scrollLeft = this.width_diff
		// 添加滚动监听事件
		let _this = this
		dom.addEventListener('scroll', event => {
            let obj = event.srcElement ? event.srcElement : event.target
			if(obj.scrollLeft < _this.width_diff){
				_this.scrollLeft = obj.scrollLeft = _this.width_diff
			}else if(obj.scrollLeft > max){
				_this.scrollLeft = obj.scrollLeft = max
			}
			clearTimeout(_this.timer)
			_this.timer = setTimeout(function(){
				_this.scrollLeft = dom.scrollLeft = _this.getApproximate(obj.scrollLeft)
			},300)
        })
    },
    watch: {
        scrollLeft() {
            let v = this.getValue(this.scrollLeft)
            this.$emit('input', v)
        }
    }
}
</script>
<style lang="css" scoped>
@import "./style.css";
</style>
