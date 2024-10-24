<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    components: {

    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        // this.GetStatistics();

    },

    computed: {
        //...mapGetters("Services", ["getStatisticsData"]),

    },
    methods: {
        //...mapActions("Services", ["GetStatistics"]),

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
                          <th scope="col">Name</th>
                          <th scope="col">Nickname</th>
                          <th scope="col"> Phone Number </th>
                          <th scope="col">email</th>
                          <th scope="col">State</th>
                          <th scope="col">option</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td>Ahmad mahmood</td>
                          <td>AhmadMah</td>
                          <td>0012589746565</td>
                          <td>ahmadma12@gmail.com</td>
                          <td>California</td>
                          <td>
                              <i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#delete_order"></i>
                              <i class="fa fa-edit "data-bs-toggle="modal" data-bs-target="#Edit_order"></i>
                          </td>
                      </tr>
                      <tr>
                        <td>Ahmad mahmood</td>
                        <td>AhmadMah</td>
                        <td>0012589746565</td>
                        <td>ahmadma12@gmail.com</td>
                        <td>California</td>
                        <td>
                            <i class="fa fa-trash"></i>
                            <i class="fa fa-edit"></i>
                        </td>
                    </tr>
                    <tr>
                      <td>Ahmad mahmood</td>
                      <td>AhmadMah</td>
                      <td>0012589746565</td>
                      <td>ahmadma12@gmail.com</td>
                      <td>California</td>
                      <td>
                          <i class="fa fa-trash"></i>
                          <i class="fa fa-edit"></i>
                      </td>
                  </tr>
                  <tr>
                    <td>Ahmad mahmood</td>
                    <td>AhmadMah</td>
                    <td>0012589746565</td>
                    <td>ahmadma12@gmail.com</td>
                    <td>California</td>
                    <td>
                        <i class="fa fa-trash"></i>
                        <i class="fa fa-edit"></i>
                    </td>
                </tr>
                <tr>
                  <td>Ahmad mahmood</td>
                  <td>AhmadMah</td>
                  <td>0012589746565</td>
                  <td>ahmadma12@gmail.com</td>
                  <td>California</td>
                  <td>
                      <i class="fa fa-trash"></i>
                      <i class="fa fa-edit"></i>
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
            <button type="button" class="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>
    </div>
 
    
    <div class="modal fade" id="Edit_order" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Wedding Party</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="" method="">
              <label class=" label-form"> Name </label>
              <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <label class=" label-form"> Nickname </label>
              <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Nickname" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <label class=" label-form"> Phone Number </label>
              <div class="input-group mb-3">
                  <input id="phone" type="tel" class="form-control" maxlength="10" placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
              </div>
              <label class=" label-form"> Email </label>
              <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <label class=" label-form"> City </label>
              <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="City" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <label class=" label-form"> State </label>
              <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="State" aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <label class=" label-form"> Event Date </label>
              <div class="input-group mb-3">
                  <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp " required="">
              </div>
              <label class=" label-form"> Would you like to communicate by email or phone? </label>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                      Phone Number 
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                  <label class="form-check-label" for="flexRadioDefault2">
                    Email
                  </label>
                </div>
              <label class="label-form"> Type of service provided </label>
              <div class="input-group mb-3 checkbox">
                  <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckA-Z">
                      <label class="form-check-label" for="flexCheckDefault">
                        A - Z
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="me" checked>
                      <label class="form-check-label" for="me">
                        DJ
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="otherServicesCheckbox" checked>
                      <label class="form-check-label" for="otherServicesCheckbox">
                          Other services
                      </label>
                    </div>
              </div>
           <div  id="otherServicesTextarea">
              <label class=" label-form">Enter other services you want</label>
              <div class="input-group mb-3">
                  <textarea class="form-control" aria-label="With textarea"></textarea>
              </div>
           </div>
             
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped></style>