<template>
  <div>
    <div class="container my-4">
      <main>
        <div class="py-5 text-center">
          <h2>Edit Candidate</h2>
        </div>

        <div class="row g-5">
          <div class="col-md-7 col-lg-8 ms-auto me-auto">
            <h4 class="mb-3">Basic Info</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <label class="form-label">First name</label>
                <input type="text" class="form-control" v-model="firstname" />
              </div>

              <div class="col-sm-6">
                <label class="form-label">Last name</label>
                <input type="text" class="form-control" v-model="lastname" />
              </div>

              <div class="col-12">
                <label class="form-label">Gender</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      value="Male"
                      v-model="gender"
                    />
                    <label class="form-check-label">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      value="Female"
                      class="form-check-input"
                      type="radio"
                      v-model="gender"
                    />
                    <label class="form-check-label">Female</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      value="Other"
                      class="form-check-input"
                      type="radio"
                    />
                    <label class="form-check-label">Other</label>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="you@example.com"
                  v-model="email"
                />
              </div>

              <div class="col-12">
                <label class="form-label">Address</label>
                <textarea
                  class="form-control"
                  placeholder="1234 Main St"
                  v-model="address"
                ></textarea>
              </div>

              <div class="col-md-5">
                <label class="form-label">Country</label>
                <select v-model="country" class="form-select">
                  <option value="">Choose...</option>
                  <option>India</option>
                  <option>United States</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label">State</label>
                <select v-model="state" class="form-select">
                  <option value="">Choose...</option>
                  <option>Maharashtra</option>
                  <option>Karnataka</option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label">Pin / Zip</label>
                <input type="text" class="form-control" v-model="pin" />
              </div>
            </div>

            <hr class="my-4" />

            <h4 class="mb-3">Professional Info</h4>

            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">
                  Choose your skills
                  <span class="small text-muted">(min 3 skills)</span>
                </label>
                <div class="mb-3">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Angular"
                      v-model="skills"
                    />
                    <label class="form-check-label">Angular</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="React"
                      v-model="skills"
                    />
                    <label class="form-check-label">React</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Node.JS"
                      v-model="skills"
                    />
                    <label class="form-check-label">Node.JS</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="JavaScript"
                      v-model="skills"
                    />
                    <label class="form-check-label">JavaScript</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Flutter"
                      v-model="skills"
                    />
                    <label class="form-check-label">Flutter</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Java"
                      v-model="skills"
                    />
                    <label class="form-check-label">Java</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="row gy-3">
              <div class="col-12">
                <label class="form-label">
                  <strong>
                    Experience
                    <span class="small text-muted">(min 2, max 5 items)</span>
                  </strong>
                </label>
                <div
                  v-for="(exp, index) in experience"
                  class="card mx-3 mt-3"
                  :key="exp.duration"
                >
                  <div class="card-body">
                    <h6 class="card-title text-muted mb-3">
                      Experience #{{ index + 1 }}
                      <a
                        class="float-end text-danger fw-normal"
                        @click="deleteExp(index)"
                        :style="
                          experience.length === 1
                            ? {
                                'pointer-events': 'none',
                                cursor: 'not-allowed',
                              }
                            : { cursor: 'pointer' }
                        "
                        >Remove</a
                      >
                    </h6>
                    <div class="row g-3">
                      <div class="col-6">
                        <label class="form-label">Company Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="experience[index].cName"
                        />
                      </div>
                      <div class="col-6">
                        <label class="form-label"
                          >Duration
                          <span class="text-muted">(in months)</span></label
                        >
                        <input
                          type="number"
                          class="form-control"
                          v-model="experience[index].duration"
                        />
                      </div>
                      <div class="col-12">
                        <label class="form-label"
                          >Describe your responsibilities</label
                        >
                        <textarea
                          class="form-control"
                          v-model="experience[index].resp"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <a disabled class="d-block mt-3" @click="addmore"
                  >Add more experience</a
                >
                <!-- style="pointer-events: none" -->
              </div>
            </div>

            <hr class="my-4" />

            <button @click="saveuser" class="btn btn-primary" type="submit">
              Save Candidate
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "EditUser",
  setup() {
    let users = ref([]);
    let id = ref("");
    const formData = reactive({
      firstname: "",
      lastname: "",
      gender: "",
      email: "",
      address: "",
      country: "",
      state: "",
      pin: "",
      skills: [],
      experience: [
        { cName: "", duration: "", resp: "" },
        { cName: "", duration: "", resp: "" },
      ],
    });
    onMounted(() => {
      let a = JSON.parse(localStorage.getItem("users"));
      users = a;
      console.log(a);
      const route = useRoute();
      const ids = route.params.id;
      id = ids;

      for (const key in a[id]) {
        formData[key] = a[id][key];
      }
      console.log(formData);
    });
    function addmore() {
      formData.experience.push({ cName: "", duration: "", resp: "" });
    }
    function saveuser() {
      const proxy1 = new Proxy(formData, {});

      // console.log({ ...proxy1 });
      // console.log(JSON.parse(JSON.stringify(proxy1)));
      users[id] = { ...proxy1 };
      console.log(users);
      localStorage.setItem("users", JSON.stringify(users));
    }
    return {
      ...toRefs(formData),
      users,
      addmore,
      saveuser,
    };
  },
};
</script>

<style lang="scss" scoped></style>
