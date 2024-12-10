<template>
  <div id="app">
    <h1>Book Store</h1>

    <!-- 책 추가 폼 -->
    <div>
      <input v-model="newBook.title" placeholder="Book Title" />
      <input v-model="newBook.author" placeholder="Author" />
      <input v-model="newBook.description" placeholder="Description" />
      <input
        v-model.number="newBook.quantity"
        placeholder="Quantity"
        type="number"
      />
      <button @click="addNewBook">Add Book</button>
    </div>

    <!-- 책 필터링 -->
    <div>
      <h2>Filter Books</h2>
      <div>
        <label for="filter-category">Filter By:</label>
        <select v-model="selectedCategory" id="filter-category">
          <option value="author">Author</option>
          <option value="title">Title</option>
        </select>
        <input
          v-model="filterInput"
          :placeholder="`Enter ${selectedCategory}`"
        />
        <button @click="applyFilter">Filter</button>
      </div>
    </div>

    <!-- 필터링된 책 목록 -->
    <div>
      <h2>Book List</h2>
      <ul>
        <li v-for="book in paginatedBooks" :key="book.id">
          {{ book.title }} by {{ book.author }} - {{ book.quantity }} copies
          <button @click="goToDetail(book.id)">View Details</button>
          <button @click="removeBook(book.id)">Remove</button>
        </li>
      </ul>
    </div>

    <!-- 페이지네이션 -->
    <div>
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>
      <span>Page {{ currentPage }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router"; // Vue Router 사용

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const newBook = ref({
      title: "",
      author: "",
      description: "",
      quantity: 0,
    });

    const selectedCategory = ref("author"); // 기본값: Author
    const filterInput = ref("");
    const currentPage = ref(1); // 현재 페이지
    const itemsPerPage = 10; // 한 페이지에 표시할 책 수

    // 책 목록 (필터링된 책을 포함)
    const filteredBooks = computed(() => {
      return store.getters.filterBooks(
        selectedCategory.value,
        filterInput.value
      );
    });

    // 전체 페이지 수 (필터링된 책 목록 기준)
    const totalPages = computed(() =>
      Math.ceil(filteredBooks.value.length / itemsPerPage)
    );

    const paginatedBooks = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredBooks.value.slice(start, end);
    });

    // 책 추가
    const addNewBook = () => {
      const book = { ...newBook.value, id: Date.now() };
      store.commit("addBook", book);
      Object.assign(newBook.value, {
        title: "",
        author: "",
        description: "",
        quantity: 0,
      });
    };

    // 책 필터링
    const applyFilter = () => {
      // 필터링된 결과는 `filteredBooks`로 자동 업데이트
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    // 상세 페이지로 이동
    const goToDetail = (bookId) => {
      router.push({ name: "book-detail", params: { id: bookId } });
    };

    const removeBook = (bookId) => {
      store.commit("removeBook", bookId); // Vuex에서 삭제 처리
    };


    return {
      newBook,
      selectedCategory,
      filterInput,
      filteredBooks,
      currentPage,
      totalPages,
      paginatedBooks,
      addNewBook,
      applyFilter,
      changePage,
      goToDetail,
      removeBook,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
input,
select,
button {
  margin: 5px;
}
</style>
