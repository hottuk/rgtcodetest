import { createStore, ActionContext } from "vuex";

// Book 데이터 타입 정의
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  quantity: number;
}

// State 타입 정의
interface State {
  books: Book[];
}

// Vuex Store 생성
const store = createStore<State>({
  state: {
    books: [
      { "id": 1, "title": "동물 농장", "author": "조지 오웰", "description": "전체주의의 위험성과 사회적 불평등을 비판한 정치적 우화.", "quantity": 15 },
      { "id": 2, "title": "1984", "author": "조지 오웰", "description": "전체주의와 개인의 자유를 억압하는 미래 사회를 그린 디스토피아 소설.", "quantity": 21 },
      { "id": 3, "title": "데미안", "author": "헤르만 헤세", "description": "자아의 성장과 자아 찾기를 중심으로 한 현대적 성장 소설.", "quantity": 21 },
      { "id": 4, "title": "피쉬", "author": "헤르만 헤세", "description": "내적 성장을 위한 고통과 갈등을 그린 헤세의 자전적 소설.", "quantity": 12 },
      { "id": 5, "title": "해리 포터와 마법사의 돌", "author": "J.K. 롤링", "description": "마법 학교 호그와트에서의 모험과 우정을 그린 판타지 소설.", "quantity": 21 },
      { "id": 6, "title": "신의 섬", "author": "J.K. 롤링", "description": "마법과 현실을 넘나드는 이야기를 다룬 판타지 소설.", "quantity": 18 },
      { "id": 7, "title": "어린 왕자", "author": "앙투안 드 생텍쥐페리", "description": "어린 왕자가 지구에서 만난 다양한 인물들과의 교훈적인 이야기를 그린 작품.", "quantity": 21 },
      { "id": 8, "title": "광기", "author": "앙투안 드 생텍쥐페리", "description": "불안과 내면의 갈등을 주제로 인간의 심리를 그린 소설.", "quantity": 14 },
      { "id": 9, "title": "태백산맥", "author": "조정래", "description": "한국 현대사를 배경으로 한 대하소설로, 20세기 초반의 사회 변화를 그린 작품.", "quantity": 21 },
      { "id": 10, "title": "길 위에서", "author": "조정래", "description": "한국 현대사를 배경으로 한 사회적 갈등과 변화를 그린 작품.", "quantity": 10 },
      { "id": 11, "title": "노인과 바다", "author": "어니스트 헤밍웨이", "description": "고독한 노인이 대양에서 거대한 물고기와 싸우는 이야기를 그린 고전 소설.", "quantity": 21 },
      { "id": 12, "title": "광기의 시대", "author": "어니스트 헤밍웨이", "description": "전쟁과 인간의 고통을 그린 문학적 고전.", "quantity": 18 },
      { "id": 13, "title": "위대한 개츠비", "author": "F. 스콧 피츠제럴드", "description": "1920년대 미국의 사치와 타락을 그린 소설, 성공과 절망을 다룬 이야기.", "quantity": 21 },
      { "id": 14, "title": "다시 시작된 삶", "author": "F. 스콧 피츠제럴드", "description": "인간의 끝없는 욕망과 사회적 모순을 그린 미국 현대 소설.", "quantity": 16 },
      { "id": 15, "title": "안나 카레니나", "author": "레프 톨스토이", "description": "사랑과 배신, 자아의 갈등을 그린 러시아 대문호 톨스토이의 대표적인 소설.", "quantity": 21 },
      { "id": 16, "title": "카레니나의 일기", "author": "레프 톨스토이", "description": "안나 카레니나의 내면을 탐구하며, 삶과 사랑을 이야기하는 작품.", "quantity": 14 },
      { "id": 17, "title": "모비 딕", "author": "허먼 멜빌", "description": "고래잡이 선장과 거대한 고래와의 대결을 그린 고전 문학.", "quantity": 21 },
      { "id": 18, "title": "시가", "author": "허먼 멜빌", "description": "인간 존재의 깊이를 탐구한 고전 문학의 걸작.", "quantity": 19 },
      { "id": 19, "title": "그리스인 조르바", "author": "니코스 카잔자키스", "description": "인생의 진정한 의미를 찾기 위한 여정을 그린 그리스 소설.", "quantity": 21 },
      { "id": 20, "title": "고백", "author": "니코스 카잔자키스", "description": "죽음을 앞둔 인물이 겪는 정신적 고통과 종교적 질문을 탐구.", "quantity": 13 },
      { "id": 21, "title": "총, 균, 쇠", "author": "재레드 다이아몬드", "description": "인류 역사에 영향을 미친 환경과 문명의 차이를 설명하는 비문학서.", "quantity": 21 },
      { "id": 22, "title": "만약, 그때", "author": "재레드 다이아몬드", "description": "인류 역사의 전환점에서 인간의 선택이 미친 영향을 분석.", "quantity": 17 },
      { "id": 23, "title": "어두운 상점들의 거리", "author": "가브리엘 가르시아 마르케스", "description": "마르케스의 마법적 리얼리즘을 담은 작품으로, 시대적 배경과 인물의 갈등을 그린 소설.", "quantity": 21 },
      { "id": 24, "title": "어두운 별", "author": "가브리엘 가르시아 마르케스", "description": "마르케스의 마법적 리얼리즘을 통해 시대와 사람들의 갈등을 묘사.", "quantity": 11 },
      { "id": 25, "title": "참을 수 없는 존재의 가벼움", "author": "밀란 쿤데라", "description": "사랑과 인간 존재의 의미에 대해 탐구하는 철학적인 소설.", "quantity": 21 },
      { "id": 26, "title": "세상의 끝", "author": "밀란 쿤데라", "description": "자아를 찾는 여정에서의 갈등과 인간 관계의 복잡성을 탐구.", "quantity": 16 },
      { "id": 27, "title": "브레이브 뉴 월드", "author": "올더스 헉슬리", "description": "디스토피아 사회를 그린 소설로, 인간 자유와 통제를 탐구하는 이야기.", "quantity": 21 },
      { "id": 28, "title": "미래의 약속", "author": "올더스 헉슬리", "description": "기술과 과학이 주도하는 미래 사회를 다룬 디스토피아 소설.", "quantity": 18 },
      { "id": 29, "title": "카라마조프가의 형제들", "author": "표도르 도스토예프스키", "description": "신의 존재와 인간의 도덕성에 대한 철학적 논의가 담긴 러시아 소설.", "quantity": 21 },
      { "id": 30, "title": "사람의 길", "author": "표도르 도스토예프스키", "description": "인간의 도덕적 고뇌와 신앙의 문제를 심도 깊게 다룬 작품.", "quantity": 20 },
      { "id": 31, "title": "위대한 유산", "author": "찰스 디킨스", "description": "고아 소년의 성장 이야기를 그린 디킨스의 대표작.", "quantity": 21 },
      { "id": 32, "title": "기억의 책", "author": "찰스 디킨스", "description": "영국 산업 혁명 시기의 사회 문제와 개인의 운명을 그린 고전.", "quantity": 15 },
      { "id": 33, "title": "헝거 게임", "author": "수잔 콜린스", "description": "디스토피아 사회에서 생존을 위한 싸움을 그린 현대 판타지 소설.", "quantity": 21 },
      { "id": 34, "title": "어두운 밤", "author": "수잔 콜린스", "description": "디스토피아 사회에서의 생존과 저항을 그린 미래 지향적인 소설.", "quantity": 12 },
      { "id": 35, "title": "아이즈 오브 더 타이거", "author": "허버트 조지 웰즈", "description": "타이거의 눈을 통해 인간 존재와 사회를 고찰하는 작품.", "quantity": 18 },
      { "id": 36, "title": "검은 호수", "author": "허버트 조지 웰즈", "description": "사회적 모순과 인간 존재를 깊이 있게 탐구한 현대적 고전.", "quantity": 9 },
      { "id": 37, "title": "시간의 끝", "author": "이청준", "description": "역사적 사건을 배경으로 인간의 삶과 존재를 탐구.", "quantity": 18 },
      { "id": 38, "title": "혼돈의 시대", "author": "정이현", "description": "사회적 갈등과 인물들의 내면적 갈등을 그린 한국 소설.", "quantity": 14 },
      { "id": 39, "title": "작은 것들의 신", "author": "아룬다티 로이", "description": "인도 사회의 갈등과 역사적 배경을 그린 현대 소설.", "quantity": 21 },
      { "id": 40, "title": "시간을 달리는 소녀", "author": "츠츠이 야스타카", "description": "시간 여행을 통해 사랑과 인생의 의미를 탐구하는 이야기.", "quantity": 20 },
      { "id": 41, "title": "달과 6펜스", "author": "서머싯 몸", "description": "예술과 인생의 의미를 찾아 떠나는 여행을 그린 소설.", "quantity": 14 },
      { "id": 42, "title": "목련", "author": "서머싯 몸", "description": "소설 속 등장인물들이 자신의 욕망과 갈등을 겪는 이야기를 그린 작품.", "quantity": 12 },
      { "id": 43, "title": "라이프 오브 파이", "author": "얀 마텔", "description": "난파선에서 살아남기 위한 소년과 호랑이의 이야기를 그린 작품.", "quantity": 21 },
      { "id": 44, "title": "그의 첫 번째 이야기", "author": "얀 마텔", "description": "자아와 존재의 의미를 탐구하는 현대적인 이야기.", "quantity": 19 },
      { "id": 45, "title": "아이디어", "author": "프랜츠 카프카", "description": "불확실한 시대 속에서 개인의 내면과 사회적 갈등을 다룬 작품.", "quantity": 13 },
      { "id": 46, "title": "우리 모두의 밤", "author": "프랜츠 카프카", "description": "소설 속에서 삶의 허무와 인간의 고독을 탐구하는 작품.", "quantity": 15 },
      { "id": 47, "title": "지구의 중심으로부터", "author": "쥘 베른", "description": "지구 내부의 미지의 세계를 탐험하는 모험 소설.", "quantity": 21 },
      { "id": 48, "title": "해저 20000리", "author": "쥘 베른", "description": "바다 속 세계를 여행하며, 과학적 탐구와 모험을 그린 작품.", "quantity": 22 },
      { "id": 49, "title": "톰 소여의 모험", "author": "마크 트웨인", "description": "미국 남부의 어린 소년이 겪는 모험과 성장 이야기.", "quantity": 20 },
      { "id": 50, "title": "허클베리 핀의 모험", "author": "마크 트웨인", "description": "사회적 제약에서 벗어난 소년의 모험과 자아 찾기를 그린 작품.", "quantity": 21 }
    ]
    ,
  },

  getters: {
    /**
     * 모든 책 반환
     */
    allBooks: (state) => state.books,

    /**
     * 카테고리와 검색어에 따라 필터링된 책 반환
     * @param {string} category - "title" 또는 "author"
     * @param {string} searchTerm - 검색어
     * @returns {Book[]}
     */
    filterBooks: (state) => (category: keyof Book, searchTerm: string) => {
      if (!searchTerm.trim()) return state.books; // 검색어가 비어 있으면 전체 반환
      return state.books.filter((book) => {
        const value = book[category];
        return typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase());
      });
    },
  },

  mutations: {
    /**
     * 새로운 책 추가
     * @param {State} state
     * @param {Book} book - 추가할 책 데이터
     */
    addBook(state, book: Book) {
      state.books.push(book);
    },

    /**
     * 특정 ID의 책 제거
     * @param {State} state
     * @param {number} bookId - 제거할 책 ID
     */
    removeBook(state, bookId: number) {
      state.books = state.books.filter((book) => book.id !== bookId);
    },
    updateBook(state, updatedBook) {
      const index = state.books.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        state.books[index] = { ...updatedBook };  // 복사본으로 교체하여 상태 변경
      }
    },
  },

  actions: {
    /**
     * 비동기로 새로운 책 추가
     * @param {ActionContext<State, State>} context
     * @param {Book} book - 추가할 책 데이터
     */
    addBookAsync({ commit }: ActionContext<State, State>, book: Book) {
      setTimeout(() => {
        commit("addBook", book);
      }, 1000);
    },
    updateBook({ commit }, updatedBook) {
      commit("updateBook", updatedBook);
    },
  },

  modules: {},
});

export default store;
