<script>
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";

export default {
  data() {
    return {
      data: {
        id: 0,
        orderType: 0,
        name: "",
        nickName: "",
        email: "",
        mobile: "",
        stateId: "",
        cityId: "",
        orderDate: null,
        comunicationMethods: 0,
        service: 0,
        otherService: "",
        moreInfo: "",
        questionData: [],
        birthdayOwnerName: "",
        childrenServices: "",
        totalPrice: 0
      },

      dataSearch: {
        exceptionIds: [],
        orderType: 0,
        orderName: "",
        orderStatus: 0,
        stateId: "",
        cityId: "",
        userId: 0,
        email: localStorage.getItem('email'),
        page: 1,
        pageSize: 1000,
      },

      states: [], // Will hold the list of states
      cities: [], // Will hold the list of cities for the selected state



      selectedService: '', // To store the selected service
      showOtherServiceText: false,
      birthdayBookingFor: 0,
      birthdayAgeGroup: 0,
      childrenServices: [],

      weddingQuestion: [],
      engagementQuestion: [],
      birthdayQuestion: [],
      graduationQuestion: [],
      specialQuestion: [],
      jobApplicationQuestion: [],

      userAnswers: {},
      questions: [ /* your questions array */],

    }
  },

  mounted() {
    //console.log("this.getQuestionsData : ", this.getQuestionsData);
    // Initialize intl-tel-input on the input element
    this.iti = window.intlTelInput(this.$refs.phoneInput, {
      initialCountry: "us",
      strictMode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    this.organizeQuestions();
  },
  beforeUnmount() {
    // Properly destroy the instance when the component is unmounted
    if (this.iti) {
      this.iti.destroy();
    }

  },


  components: {
    formattedUserAnswers: {
      get() {
        const formattedAnswers = {};
        for (const questionId in this.userAnswers) {
          if (Array.isArray(this.userAnswers[questionId])) {
            formattedAnswers[questionId] = this.userAnswers[questionId].join(', ');
          } else {
            formattedAnswers[questionId] = this.userAnswers[questionId] || '';
          }
        }
        return formattedAnswers;
      },
      set(value) {
        for (const questionId in value) {
          this.userAnswers[questionId] = value[questionId]
            .split(', ')
            .filter(Boolean);
        }
      }
    }
  },

  emits: {

  },

  created() {
    this.fetchStates();
    this.initFunc();
    this.GetQuestionsData();
    this.GetComunicationMethods();
    this.GetOrderServices();
    this.GetChildrenServices();
  },

  computed: {
    ...mapGetters("Code", ["getQuestionsData", "getComunicationMethodsData", "getOrderServicesData", "getChildrenServicesData"]),
    ...mapGetters("Orders", ["getOrdersData"]),

  },
  methods: {
    ...mapActions("Code", ["GetQuestionsData", "GetComunicationMethods", "GetOrderServices", "GetChildrenServices"]),
    ...mapActions("Orders", ["GetOrders", "UpdateOrder", "DeleteOrder"]),
    ...mapActions("Users", ["CustomerProfileInfo"]),

    // Fetch the states from the API
    async fetchStates() {
      try {
        const response = await axios.get("https://api.census.gov/data/2020/dec/pl?get=NAME&for=state:*", {
          withCredentials: false,
        });
        // API returns the first element as headers, so we slice it off
        this.states = response.data;
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    },

    // Fetch cities based on the selected state
    async fetchCities(stateId) {
      try {
        const response = await axios.get(
          `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
          withCredentials: false,
        });
        this.cities = response.data;
        console.log(this.cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    },

    initFunc() {

      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });
      this.GetOrders(this.dataSearch).then(Response => {
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
    },

    GetData() {
      this.GetOrders(this.dataSearch).then(Response => {
      }).catch(error => {
        this.$moshaToast(error.response.data.message, {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
      });
    },

    OrderUpdate() {

      this.data.childrenServices = this.convertSelectedChildrenServicesToString();

      this.saveAnswersFunc();
      console.log("this.data : ", this.data);
      if (this.checkValidation()) {
        const loading = ElLoading.service({
          lock: true,
          background: 'rgba(0, 0, 0, 0.7)',
          text: "",
        });

        this.UpdateOrder(this.data).then(Response => {
          console.log(Response);
          this.$moshaToast('Update order success', {
            hideProgressBar: 'false',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'success',
            timeout: 3000,
          });
          this.GetData();
          loading.close();
          $('#Edit_order').modal('hide');
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
      if (this.data.orderType == 23) {
        if (this.data.name.trim() == '') {
          this.$moshaToast("enter name", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.email.focus();
          return false;
        } else if (this.data.nickName.trim() == '') {
          this.$moshaToast("enter nickname", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.nickName.focus();
          return false;
        } else if (this.data.email.trim() == '') {
          this.$moshaToast("enter email", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        } else if (this.data.mobile.trim() == '') {
          this.$moshaToast("enter mobile", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        }
        // else if (this.data.stateId.trim() == '') {
        //   this.$moshaToast("select state", {
        //     hideProgressBar: 'false',
        //     position: 'top-center',
        //     showIcon: 'true',
        //     swipeClose: 'true',
        //     type: 'warning',
        //     timeout: 3000,
        //   });
        //   this.$refs.password.focus();
        //   return false;
        // } else if (this.data.cityId.trim() == '') {
        //   this.$moshaToast("select city", {
        //     hideProgressBar: 'false',
        //     position: 'top-center',
        //     showIcon: 'true',
        //     swipeClose: 'true',
        //     type: 'warning',
        //     timeout: 3000,
        //   });
        //   this.$refs.password.focus();
        //   return false;
        // }
        else if (this.data.comunicationMethods == 0) {
          this.$moshaToast("select comunication method", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        } 
        
      } else {
        if (this.data.name.trim() == '') {
          this.$moshaToast("enter name", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.email.focus();
          return false;
        } else if (this.data.nickName.trim() == '') {
          this.$moshaToast("enter nickname", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.nickName.focus();
          return false;
        } else if (this.data.email.trim() == '') {
          this.$moshaToast("enter email", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        } else if (this.data.mobile.trim() == '') {
          this.$moshaToast("enter mobile", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        }

        // else if (this.data.stateId.trim() == '') {
        //   this.$moshaToast("select state", {
        //     hideProgressBar: 'false',
        //     position: 'top-center',
        //     showIcon: 'true',
        //     swipeClose: 'true',
        //     type: 'warning',
        //     timeout: 3000,
        //   });
        //   this.$refs.password.focus();
        //   return false;
        // } else if (this.data.cityId.trim() == '') {
        //   this.$moshaToast("select city", {
        //     hideProgressBar: 'false',
        //     position: 'top-center',
        //     showIcon: 'true',
        //     swipeClose: 'true',
        //     type: 'warning',
        //     timeout: 3000,
        //   });
        //   this.$refs.password.focus();
        //   return false;
        // }

        else if (this.data.orderDate == null) {
          this.$moshaToast("enter party date", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        } else if (this.data.comunicationMethods == 0) {
          this.$moshaToast("select comunication method", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        } else if (this.data.service == 0) {
          this.$moshaToast("select service", {
            hideProgressBar: 'false',
            position: 'top-center',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'warning',
            timeout: 3000,
          });
          this.$refs.password.focus();
          return false;
        }
      }




      return true;
    },

    DeleteFunc() {
      if (this.checkDeleteValidation()) {

        const loading = ElLoading.service({
          lock: true,
          background: 'rgba(0, 0, 0, 0.7)',
          text: "",
        });

        this.DeleteOrder(this.data.id).then(Response => {
          //console.log(Response);
          this.$moshaToast('Deleted order successfully', {
            hideProgressBar: 'false',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'success',
            timeout: 3000,
          });
          loading.close();
          this.GetData();
          $('#delete_order').modal('hide');
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

    checkDeleteValidation() {
      if (this.data.id == 0) {
        this.$moshaToast('error in item select', {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
        return false;
      }
      return true;
    },

    organizeQuestions() {
      // Clear previous data
      this.weddingQuestion = [];
      this.engagementQuestion = [];
      this.birthdayQuestion = [];
      this.graduationQuestion = [];
      this.specialQuestion = [];
      this.jobApplicationQuestion = [];


      // Iterate over questions and filter based on orderType
      for (const question of this.getQuestionsData) {
        switch (question.orderType) {
          case 17:
            this.weddingQuestion.push(question);
            break;
          case 18:
            this.engagementQuestion.push(question);
            break;
          case 19:
            this.birthdayQuestion.push(question);
            break;
          case 20:
            this.graduationQuestion.push(question);
            break;
          case 21:
            this.specialQuestion.push(question);
            break;
          case 23:
            this.jobApplicationQuestion.push(question);
            break;
          default:
            console.warn(`No array for orderType: ${question.orderType}`);
        }
      }

      // Optional: Log the results to the console
      console.log("Wedding Questions:", this.weddingQuestion);
      console.log("Engagement Questions:", this.engagementQuestion);
      console.log("Birthday Questions:", this.birthdayQuestion);
      console.log("Graduation Questions:", this.graduationQuestion);
      console.log("Special Questions:", this.specialQuestion);
    },

    saveAnswersFunc() {
      // Clear the previous questionData
      this.data.questionData = [];

      // Loop through each question to build the questionData
      for (const question of this.questions) {
        // Create a new entry for questionData
        const questionEntry = {
          id: question.id, // Using the question ID
          question: question.questionName, // Using the question name
          answer: ""
        };

        questionEntry.answer = String(this.userAnswers[question.id] || '');


        // Add the question entry to the questionData array
        this.data.questionData.push(questionEntry);
      }

      console.log(this.data.questionData); // Display the collected data
    },

    handleServiceChange() {
      // If "Other services" is selected, clear the textarea
      const selectedUser = this.getOrderServicesData.find(x => x.id === this.data.service);
      // console.log("selectedUser :", selectedUser);
      if (selectedUser) {
        if (selectedUser.name.toLowerCase().includes('other')) {
          this.showOtherServiceText = true;
        } else {
          this.data.otherService = '';
          this.showOtherServiceText = false;
        }
      }

      this.showOtherServi
      //console.log("this.selectedService : ", this.selectedService);
    },

    submitServices() {
      // Create a string to store the selected service(s)
      const services = this.selectedService === 'Other services'
        ? this.otherServices
        : this.selectedService;

      return services;

    },

    getCommaSeparatedAnswers(questionId) {
      // Ensure userAnswers[questionId] is an array, otherwise use an empty array
      const answers = Array.isArray(this.userAnswers[questionId]) ? this.userAnswers[questionId] : [];
      return answers.join(', ');
    },

    handleCheckboxChange(questionId, answerName, event) {
      // Ensure userAnswers[questionId] is an array
      if (!this.userAnswers[questionId]) {
        // Initialize it as an empty array if it's not defined or is not an array
        this.userAnswers[questionId] = [];
      } else if (typeof this.userAnswers[questionId] === 'string') {
        // If it's a string, convert it back to an array
        this.userAnswers[questionId] = this.userAnswers[questionId].split(', ').filter(Boolean);
      }

      // Add or remove the answer based on the checkbox state
      if (event.target.checked) {
        // Add the answer to the array if not already present
        if (!this.userAnswers[questionId].includes(answerName)) {
          this.userAnswers[questionId].push(answerName);
        }
      } else {
        // Remove the answer from the array
        const index = this.userAnswers[questionId].indexOf(answerName);
        if (index !== -1) {
          this.userAnswers[questionId].splice(index, 1);
        }
      }

      // Convert the array to a comma-separated string
      this.userAnswers[questionId] = this.userAnswers[questionId].join(', ');
      //  console.log("this.userAnswers[questionId] : " , this.userAnswers[questionId]);
    },

    clearData() {
      this.data.id = 0;
      this.data.orderType = 0;
      this.data.name = "";
      this.data.nickName = "";
      this.data.email = "";
      this.data.mobile = "";
      this.data.stateId = "";
      this.data.cityId = "";
      this.data.orderDate = null;
      this.data.service = 0;
      this.data.otherService = "";
      this.data.comunicationMethods = 0;
      this.data.moreInfo = "";
      this.data.questionData = [];
      this.data.childrenServices = "";
      this.data.totalPrice = 0;
    },

    async selectItem(id) {

      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });
      const selectedOrder = this.getOrdersData.orders.data.find(x => x.id === id);
      this.clearData();

      if (selectedOrder) {
        // Set the initial values immediately
        this.data.id = selectedOrder.id;
        this.data.orderType = selectedOrder.orderType;
        this.data.name = selectedOrder.name;
        this.data.nickName = selectedOrder.nickName;
        this.data.email = selectedOrder.email;
        this.data.mobile = selectedOrder.mobile;
        this.data.moreInfo = selectedOrder.moreInfo;
        this.data.orderDate = selectedOrder.orderDateSt;

        this.data.service = selectedOrder.serviceId;
        this.data.otherService = selectedOrder.otherService;
        this.handleServiceChange();
        this.data.comunicationMethods = selectedOrder.comunicationMethodId;
        this.data.stateId = selectedOrder.stateId;
        this.data.birthdayOwnerName = selectedOrder.birthdayOwnerName;
        this.data.childrenServices = selectedOrder.childrenServices;

        if (this.data.birthdayOwnerName != "") {
          this.birthdayBookingFor = 2;
        }

        if (this.data.childrenServicesName != "") {
          this.birthdayAgeGroup = 11;
          this.childrenServices = selectedOrder.childrenServices;
        }
        //console.log("this.data : ", this.data);

        await this.fetchCities(selectedOrder.stateId);
        // Wait for the cities to load and then set the city ID
        this.data.cityId = selectedOrder.cityId;

        // console.log("question save : " , selectedOrder.questionData);
        ///// map data
        switch (this.data.orderType) {
          case 17:
            this.questions = this.weddingQuestion;
            break;
          case 18:
            this.questions = this.engagementQuestion;
            break;
          case 19:
            this.questions = this.birthdayQuestion;
            break;
          case 20:
            this.questions = this.graduationQuestion;
            break;
          case 21:
            this.questions = this.specialQuestion;
            break;
          case 23:
            this.questions = this.jobApplicationQuestion;
            break;
        }
        //console.log("this.questions : ", selectedOrder.questionData);
        this.initializeAnswers(selectedOrder.questionData);
      }
      loading.close();
    },

    selectItemForDelete(id) {
      console.log("id :", id);
      const selectedOrder = this.getOrdersData.orders.data.find(x => x.id === id);
      console.log("selectedOrder :", selectedOrder);

      if (selectedOrder) {
        this.data.id = selectedOrder.id;
      }

    },

    initializeAnswers(dataFromDB) {
      dataFromDB.forEach(item => {
        const questionId = item.questionId;
        const answer = item.questionAnswer;

        // If it's a checkbox question, split the answers into an array
        if (this.getQuestionAnswerType(questionId) === 'checkbox') {
          this.userAnswers[questionId] = answer ? answer.split(',').map(a => a.trim()) : [];
          console.log("checkbox answer : ", this.userAnswers[questionId]);
        } else {
          // For other question types, set the answer directly
          this.userAnswers[questionId] = answer;
        }
      });
    },

    getQuestionAnswerType(questionId) {
      const question = this.questions.find(q => q.id === questionId);
      return question ? question.questionAnswerType : null;
    },

    convertSelectedChildrenServicesToString() {
      return this.childrenServices.join(', ');
    }

  }
};
</script>
<template>

  <!-- right side container -->
  <div class="col-12 col-lg-9">
    <div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Order Type</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile </th>
            <th scope="col">Order status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index ) in getOrdersData.orders.data">
            <td>{{ index + 1 }}</td>
            <td>{{ item.orderTypeName }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.statusName }}</td>

            <td>
              <a v-on:click="selectItemForDelete(item.id)">
                <i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#delete_order"></i>
              </a>
              <a v-on:click="selectItem(item.id)">
                <i class="fa fa-edit " data-bs-toggle="modal" data-bs-target="#Edit_order"></i>
              </a>
            </td>

          </tr>

        </tbody>
      </table>
    </div>
  </div>
  <!-- end right side  -->

  <div class="modal fade" id="delete_order" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete Order</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete the Order?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" v-on:click="DeleteFunc()" class="btn btn-primary">Delete</button>
        </div>
      </div>
    </div>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="Edit_order" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Update order</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="" method="">
            <label class=" label-form"> Name </label>
            <div class="input-group mb-3">
              <input v-model="data.name" type="text" class="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1">
            </div>
            <label class=" label-form"> Nickname </label>
            <div class="input-group mb-3">
              <input v-model="data.nickName" type="text" class="form-control" placeholder="Nickname"
                aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <label class=" label-form"> Mobile </label>
            <div class="input-group mb-3">
              <input v-model="data.mobile" id="phone" type="tel" ref="phoneInput" class="form-control" maxlength="10"
                placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1" required>

            </div>
            <label class=" label-form"> Email </label>
            <div class="input-group mb-3">
              <input v-model="data.email" type="text" class="form-control" placeholder="Email" aria-label="Username"
                aria-describedby="basic-addon1">
            </div>
            <label class=" label-form"> State </label>
            <div class="input-group mb-3">
              <select v-model="data.stateId" class="form-control" @change="fetchCities(data.stateId)">
                <option value="" key="" selected>-- select a state --</option>
                <option v-for="item in states" :key="parseInt(item[1])" :value="item[1]">
                  {{ item[0] }}
                </option>
              </select>
            </div>
            <label class=" label-form"> City </label>
            <div class="input-group mb-3">
              <select v-model="data.cityId" class="form-control" :disabled="cities.length === 0">
                <option value="" key="" selected>-- select a city --</option>
                <option v-for="item in cities" :key="parseInt(item[2])" :value="item[2]">
                  {{ item[0] }}
                </option>
              </select>
            </div>
            <label v-if="data.orderType != 23" class=" label-form"> Party date </label>
            <div v-if="data.orderType != 23" class="input-group mb-3">
              <input class="form-control" type="date" v-model="data.orderDate" required />
            </div>

            <label class=" label-form"> Would you like to communicate by ? </label>

            <div class="mb-3">
              <div class="form-check" v-for="service in this.getComunicationMethodsData" :key="service.id">
                <input class="form-check-input" type="radio" name="radio" :id="'service-' + service.id"
                  :value="service.id" v-model="data.comunicationMethods">
                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }} </label>
              </div>
            </div>

            <label v-if="data.orderType != 23" class="label-form">Select the type of service provided</label>
            <div v-if="data.orderType != 23" class="mb-3">
              <div class="form-check" v-for="service in this.getOrderServicesData" :key="service.id">
                <input class="form-check-input" type="radio" name="rad" :id="'service-' + service.id"
                  :value="service.id" v-model="data.service" @change="handleServiceChange">
                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }} </label>
              </div>
            </div>
            <!-- Textarea for "Other services" -->
            <div v-if="this.showOtherServiceText">
              <label class="label-form">Please specify other services:</label>
              <textarea class="form-control" v-model="data.otherService" rows="3"></textarea>
            </div>
            <div v-if="this.data.orderType == 19">
              <label class="label-form">Are you booking the party for yourself or someone else?</label>
              <div class="mb-3">
                <div class="form-check" key="1">
                  <input class="form-check-input" type="radio" name="bookfor" id="1" value="1"
                    v-model="birthdayBookingFor">
                  <label class="form-check-label" for="1"> My self </label>
                </div>
                <div class="form-check" key="1">
                  <input class="form-check-input" type="radio" name="bookfor" id="2" value="2"
                    v-model="birthdayBookingFor">
                  <label class="form-check-label" for="2"> Someone else </label>
                </div>
              </div>

              <div v-if="this.birthdayBookingFor == 2">
                <label class="label-form">Birthday owner's name</label>
                <input v-model="data.birthdayOwnerName" type="text" class="form-control"
                  placeholder="Birthday owner's name" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <label v-if="this.birthdayBookingFor == 2" class="label-form">What is his age group?</label>
              <div class="mb-3" v-if="this.birthdayBookingFor == 2">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="ageGroup" id="11" value="11"
                    v-model="birthdayAgeGroup">
                  <label class="form-check-label" for="11"> Child </label>
                </div>
                <div class="form-check" v-on:click="deleteChildrenService()">
                  <input class="form-check-input" type="radio" name="ageGroup" id="22" value="22"
                    v-model="birthdayAgeGroup">
                  <label class="form-check-label" for="22"> Adult </label>
                </div>
              </div>

              <label v-if="this.birthdayAgeGroup == 11" class="label-form">Services provided to children</label>
              <div v-if="this.birthdayAgeGroup == 11" class="mb-3">
                <div class="form-check" v-for="service in this.getChildrenServicesData" :key="service.id">
                  <input name="childrenService" class="form-check-input" type="checkbox" :id="'checkbox-' + service.id"
                    :value="service.id" v-model="childrenServices" />
                  <label :for="'checkbox-' + service.id">{{ service.name }}</label>
                </div>
              </div>
            </div>
            <div v-for="(question, index) in this.questions" :key="question.id">
              <label class="label-form">{{ question.questionName }}</label>

              <div class="input-group mb-3" v-if="question.questionAnswerType === 'text'">
                <textarea class="form-control" type="text" v-model="userAnswers[question.id]"
                  :required="question.required"></textarea>
              </div>

              <div class="input-group mb-3" v-else-if="question.questionAnswerType === 'number'">
                <input class="form-control" type="number" v-model="userAnswers[question.id]"
                  :required="question.required" />
              </div>

              <div class="input-group mb-3" v-else-if="question.questionAnswerType === 'date'">
                <input class="form-control" type="date" v-model="userAnswers[question.id]"
                  :required="question.required" />
              </div>

              <div class=" mb-3" v-else-if="question.questionAnswerType === 'checkbox'">
                <div class="form-check" v-for="answer in question.answers" :key="answer.id">
                  <input class="form-check-input" type="checkbox" :id="'checkbox-' + answer.id"
                    :value="answer.answerName" v-model="userAnswers[question.id]" />
                  <label :for="'checkbox-' + answer.id">{{ answer.answerName }}</label>
                </div>
              </div>

              <div class=" mb-3" v-else-if="question.questionAnswerType === 'radio'">
                <div class="form-check" v-for="answer in question.answers" :key="answer.id">
                  <input class="form-check-input" type="radio" :name="'radio-' + question.id" :id="'radio-' + answer.id"
                    :value="answer.answerName" v-model="userAnswers[question.id]" :required="question.required" />
                  <label :for="'radio-' + answer.id">{{ answer.answerName }}</label>
                </div>
              </div>

              <div v-if="question.required && !userAnswers[question.id]">
                <span class="text-danger">This question is required.</span>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" v-on:click="OrderUpdate()" class="btn btn-primary">Save order</button>
        </div>
      </div>
    </div>
  </div>


</template>
<style scoped></style>