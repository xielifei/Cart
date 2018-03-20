var vm=new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllFlog:false
	},
	filters:{
		formatMoney:function(value){
			return "$"+value.toFixed(2);
		}
	},
	mounted:function(){
		this.cartView();
	},
	methods:{
		cartView:function(){
			let _this=this;
			this.$http.get("data/cartData.json",{"id":123}).then(res=>{
				this.productList=res.data.result.list;
				this.totalMoney=res.data.result.totalMoney;
			})
		},
		changenum:function(product,val){
			if(val>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity=1;
				}
			}
		},
		selectcheck:function(item){
			if(typeof item.check=="undefined"){
				this.$set(item,'check',true)
			}else{
				item.check=!item.check;
			}
		},
		checkAll:function(flag){
			this.checkAllFlog=flag;
			var _this=this;
			this.productList.forEach(function(item,index){
				if(typeof item.check=="undefined"){
				_this.$set(item,'check',_this.checkAllFlog)
				console.log("11"+_this.checkAllFlog)
				
			}else{
				item.check=_this.checkAllFlog;
				console.log("22"+_this.checkAllFlog)
			}
			})
		}
	}
})