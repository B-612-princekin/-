import Vue from 'vue'
import VueRouter from 'vue-router'
import Bookrack from '../views/HomeBookrack.vue'
import BookCity from '../views/HomeBookCity.vue'
import Classify from '../views/HomeClassify.vue'
import Mine from '../views/HomeMine.vue'
import SearchView from '../views/SearchView.vue'
import BookContent from '../views/BookContent.vue'
import BookCatalogue from '../views/BookCatalogue.vue'
import ChaptersArrangements from '../views/ChaptersArrangements.vue'
import RankingList from '../views/RankingList.vue'
import RankingPublish from '../views/RankingPublish.vue'
import RankingGirl from '../views/RankingGirl.vue'
import RankingBoutique from '../views/RankingBoutique.vue'
import VoiceBook from '../views/VoiceBook.vue'

import BookCityChoiceness from '@/components/BookCityChoiceness.vue'
import BookCityGratis from '@/components/BookCityGratis.vue'
import BookCityBoy from '@/components/BookCityBoy.vue'
import BookCityGirl from '@/components/BookCityGirl.vue'
import BookCityPublish from '@/components/BookCityPublish.vue'
import BookCityVoiceBook from '@/components/BookCityVoiceBook.vue'
import RankingListBoy from '@/components/RankingListBoy.vue'
import RankingListGirl from '@/components/RankingListGirl.vue'
import RankingListHear from '@/components/RankingListHear.vue'
import RankingListPublish from '@/components/RankingListPublish.vue'

import ClassifyBoy from '@/components/ClassifyBoy.vue'
import ClassifyGril from '@/components/ClassifyGril.vue'
import ClassifyPublish from '@/components/ClassifyPublish.vue'
import ClassifyVoiceBook from '@/components/ClassifyVoiceBook.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/bookrack"
  },
  {
    path: '/bookrack',
    name: 'bookrack',
    component: Bookrack
  },
  {
    path: '/book-city',
    name: 'book-city',
    component: BookCity,
    children: [
      {
        path: '/',
        redirect: "BookCityChoiceness"
      },
      {
        path: 'BookCityChoiceness',
        name: 'BookCityChoiceness',
        component: BookCityChoiceness
      },
      {
        path: 'BookCityGratis',
        name: 'BookCityGratis',
        component: BookCityGratis
      },
      {
        path: 'BookCityBoy',
        name: 'BookCityBoy',
        component: BookCityBoy
      },
      {
        path: 'BookCityGirl',
        name: 'BookCityGirl',
        component: BookCityGirl
      },
      {
        path: 'BookCityPublish',
        name: 'BookCityPublish',
        component: BookCityPublish
      },
      {
        path: 'BookCityVoiceBook',
        name: 'BookCityVoiceBook',
        component: BookCityVoiceBook
      },
    ]
  },
  {
    path: '/Classify',
    name: 'Classify',
    component: Classify,
    children: [
      {
        path: '',
        redirect: "ClassifyBoy"
      },
      {
        path: 'ClassifyBoy',
        name: 'ClassifyBoy',
        component: ClassifyBoy,
      },
      {
        path: 'ClassifyGril',
        name: 'ClassifyGril',
        component: ClassifyGril
      },
      {
        path: 'ClassifyPublish',
        name: 'ClassifyPublish',
        component: ClassifyPublish
      },
      {
        path: 'ClassifyVoiceBook',
        name: 'ClassifyVoiceBook',
        component: ClassifyVoiceBook
      },
    ]
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/SearchView',
    name: 'SearchView',
    component: SearchView,
  },
  {
    // path: '/book/:bookId/catalogue',
    path:"/book/:bookId/title/:title",
    component: BookContent
  },
  {
    path: '/book/:bookId/content',
    // path:"BookCatalogue",
    component: BookCatalogue
  },
  {
    path: '/book/:bookId/read/:contentId',
    // path:"ChaptersArrangements",
    component: ChaptersArrangements
  },
  {
    path: '/book/:bookId/list/:rankType',
    // path:"ChaptersArrangements",
    component: RankingList,
    children:[
      {
        path: '',
        redirect: "boy"
      },
      {
        path:"boy",
        component:RankingListBoy,
        meta:"boy"
      },
      {
        path:"girl",
        component:RankingListGirl,
        meta:"girl"
      },
      {
        path:"publish",
        component:RankingListHear,
        meta:"publish"
      },
      {
        path:"hear",
        component:RankingListPublish,
        meta:"hear"
      },
    ]
  },
  {
    path: '/ranking-publish/:myUrl',
    component: RankingPublish
  },
  {
    path: '/ranking-girl/:catId',
    component: RankingGirl
  },
  {
    path: '/RankingBoutique',
    component: RankingBoutique
  },
  {
    path: '/VoiceBook/:audio/bookName/:title',
    component: VoiceBook
  },
]

const router = new VueRouter({
  mode:"hash",
  routes
})
// 解决重复路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
