<script>
import { useHead } from '@vueuse/head'
import { ElLoading } from 'element-plus';
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";


export default {
	props: {

	},
	mounted() {
        useHead({
                // Can be static or computed
                title: 'Login | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties. Our platform also supports businesses by providing a marketplace where they can showcase and sell everything related to parties.',
                    },
                    ],
                
                });
			},
	components: {
		RouterView
	},

	data() {
		return {
			user: {
				email: "",
				password: "",
			},

			newPasswordData: {
				userId : 0,
				email: "",
				Mobile:"",
				sendWay:0,
				oldPassword:"",
				newPassword:""
			},

			isPasswordVisible: false,
		}
	},

	created() {
		localStorage.clear();
	},

	computed: {

	},

	methods: {
		...mapActions("Users", ["GetLogin" , "GetNewPassword"]),
		
		getLoginfunc() {
			if (this.checkValidation()) {
				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});

				this.GetLogin(this.user).then(Response => {
					this.$moshaToast('Login Success', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});
					loading.close();
					console.log("login responce : ", Response);
					if (Response.typeName == "Customer") {
						this.$router.push({ name: 'main' });
					}
				}).catch(error => {
					this.$moshaToast(error.response.data.message, {
						hideProgressBar: 'false',
						position: 'top-center',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'warning',
						timeout: 3000,
					});
					loading.close();
				});
			}

		},

		checkValidation() {
			if (this.user.email.trim() == '') {
				this.$moshaToast("enter email", {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				this.$refs.email.focus();
				return;
			}
			if (this.user.password.trim() == '') {
				this.$moshaToast("enter password", {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				this.$refs.password.focus();
				return;
			}
			return true;
		},

		clearNewPasswordFunc(){
			    this.newPasswordData.userId = 0;
				this.newPasswordData.email= "";
				this.newPasswordData.Mobile="";
				this.newPasswordData.sendWay=0;
				this.newPasswordData.oldPassword="";
				this.newPasswordData.newPassword="";
		},
		getNewPasswordFunc() {
			if (this.checkNewPasswordValidation()) {
				const loading = ElLoading.service({
					lock: true,
					background: 'rgba(0, 0, 0, 0.7)',
					text: "",
				});
				this.GetNewPassword(this.newPasswordData).then(Response => {
					this.$moshaToast('We send new password to your email', {
						hideProgressBar: 'false',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'success',
						timeout: 3000,
					});
					loading.close();
				}).catch(error => {
					this.$moshaToast(error.response.data.message, {
						hideProgressBar: 'false',
						position: 'top-center',
						showIcon: 'true',
						swipeClose: 'true',
						type: 'warning',
						timeout: 3000,
					});
					loading.close();
				});
			}
		},

		checkNewPasswordValidation() {
			if (this.newPasswordData.email.trim() == '') {
				this.$moshaToast("enter email", {
					hideProgressBar: 'false',
					position: 'top-center',
					showIcon: 'true',
					swipeClose: 'true',
					type: 'warning',
					timeout: 3000,
				});
				this.$refs.email.focus();
				return;
			}
			return true;
		},

		togglePasswordVisibility() {
			this.isPasswordVisible = !this.isPasswordVisible;
			console.log("this.isPasswordVisible : " , this.isPasswordVisible);
		},
	},
}
</script>

<template>
	<div class="container me-lg-0 login">
		<div class="row flex-column-reverse flex-lg-row ">
			<div class="col-12 col-lg-5 mt-5">
				<div class="row row-login">
					<div class="col-12 col-lg-8">
						<div class="img">
							<router-link to="/">
							<img src="/img/YallaPartyLogo2.png" alt="">
							</router-link>
						</div>
						<div class="text-center">
							<h2 class="title_log">Login</h2>
							<div>
								<p class="gray_text"> Welcome to the Yalla Party </p>
							</div>
						</div>
						<!--   wrap tab in mobile (need to edit in responsive) /  appear in right side in tablet //// done -->

						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade show active" id="user" role="tabpanel" aria-labelledby="home-tab">
								<form class="mt-4">
									<label class="text">Email</label>
									<br>
										<input @keypress.enter="getLoginfunc()" name="email" type="email" dir="ltr"
										v-model="user.email"
										class="form-control my-3 py-3 text-start gray_text gray-inp "
										placeholder="email" required >

										<div class="password-container">
											<label class="text">Password</label>
											<br />
											<input @keypress.enter="getLoginfunc"
											:type="isPasswordVisible ? 'text' : 'password'"
											v-model="user.password" class="form-control my-3 py-3 gray_text gray-inp"
											autocomplete="current-password" placeholder="password"
											required @input="console.log('Current input type:', $event.target.type)" />
											<span @click="togglePasswordVisibility" style="cursor: pointer;">
												<i :class="isPasswordVisible ? 'far fa-eye-slash' : 'far fa-eye'"></i>
											</span>
										</div>
									

									<div class="d-flex justify-content-end">
										<a v-on:click="clearNewPasswordFunc()" data-bs-toggle="modal" data-bs-target="#forgot_password"
											class="text text-login forgot-password">forgot your password?</a>
									</div>

									<button type="button" v-on:click="getLoginfunc()" class="btn_submit_1 form-control mt-3 py-3" value="Login">
										Login
									</button>
								</form>

								<router-link to="/signUp" class="text text-login">Create Account</router-link>

							</div>

						</div>
					</div>
				</div>
			</div>


			<div class="col-12 col-lg-7  pe-lg-0 image">
				<!-- <img src="assets/img/bg-login.jpg" class="img-fluid" alt=""> -->
			</div>

		</div>
	</div>

	<div class="modal fade" id="forgot_password" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">forgot your password? </h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" method="">
						<label class=" label-form"> Send to email </label>
						<div class="input-group mb-3">
							<input type="email" class="form-control" placeholder="Email" aria-label="Email"
								aria-describedby="basic-addon1" v-model="newPasswordData.email">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" v-on:click="getNewPasswordFunc()">Send
						Password</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>