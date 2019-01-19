export const lazy = {
	created() {
	},
	data() {
		return {
			filesToUpload: null,
			completeText: '',
            detecturl:'',
			ErrMessage:'正在分析中请稍后'
		}
	},
	mounted(){

	},
	methods: {
		StartOCR() {
     			this.messagebar = true;
			//if (this.Validate()) {
				this.progressbar = true;
				this.ErrMessage = '正在分析中请稍后'
				$("#btnStartOCR").attr("disabled", "disabled");
				var formData = new FormData();
				if (this.filesToUpload) {
					formData.append("file", this.filesToUpload[0])
				};
				formData.append("url", this.inputurl);
				formData.append("detectType", this.detectType);
				
				/*this.webApiParseImageRelativeURL=$("#ocrLanguage option:selected").val();*/
				    
				this.completeText = "";
				jQuery.ajax({
					url: this.detecturl,//后台地址
					data: formData,
					dataType: "json",
					cache: false,
					contentType: false,// 告诉jQuery不要去处理发送的数据
					processData: false,// 告诉jQuery不要去设置Content-Type请求头
					type: "POST",
					success: function(response) {	
						console.log('get response success')
						console.log(response)
						var _PResults = response.ParsedResults;
						//var _OExitCode = response.OCRExitCode;
						var _IEOnProcessing = response.IsErroredOnProcessing;
						var _EMessage = response.ErrorMessage;
						//var _EDetails = response.ErrorDetails;
						var _PTimeInMilliseconds = response.ProcessingTimeInMilliseconds;
						var _PTime = (+_PTimeInMilliseconds) / 1000;
						var _picUrl=response.picUrl;
		                var _TxtDispaly = "";
						if (_IEOnProcessing) {
		                  _TxtDispaly += "Error: " + _EMessage ;
						}else{
							_TxtDispaly = _PResults;
							ShowSuccess("<strong>处理成功！</strong>文件成功处理并返回结果。 （ 用时: " + _PTime + " 秒 ）");
						}
						if(_picUrl!= null && _picUrl != ""){
			                this.bigimg = _picUrl
			            }
		                this.completeText += _TxtDispaly;
						if (this.completeText != null && this.completeText != undefined && this.completeText != "") {
							this.resultText = this.completeText
						};
						$("#btnStartOCR").removeAttr("disabled");
						this.progressbar = false;
						this.ErrMessage = '分析完成'
					},
					error: function(logMsg) {
						console.log('get response failed')
						$("#btnStartOCR").removeAttr("disabled");
						console.log(logMsg);
						let logText = logMsg.responseText;
						this.resultText = 'Error'
						this.progressbar = false;
					}
				})
			//}
		}, 
		
		Validate() {
			let isValidated = true;
			var msg = "";
			if ((this.filesToUpload == null || this.filesToUpload == "undefined") && (this.inputurl == null || this.inputurl == "undefined" || this.inputurl == "")) {
				msg += "上传一张图片或者添加图片url或者将图片拖拽到指定区域"
			}else if (this.filesToUpload != null && this.filesToUpload.length > 1) {
				msg += "一次只能选择一张图片"
			};
		
			if (msg != "") {
				msg = "您必须：" + msg;
				/*document.getElementById("sucOrErrMessage").innerHTML = msg;
				$("#sucOrErrMesgDiv").addClass("alert-danger");
				$("#sucOrErrMesgMainDiv").show();*/
				this.ErrMessage = msg
				console.log(msg)
				isValidated = false
				this.progressbar = false;
			};
			return isValidated
		}

	}
}
	





