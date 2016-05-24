import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';


interface Slide {
  title: string;
  description: string;
  image: string;
}

@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;

  constructor(private nav: NavController, private menu: MenuController) {
    this.slides = [
      {
        title: 'Welcome to <b>BarAdviser</b>',
        description: 'This will help something something somthiong',
        image: 'img/1.jpg',
      },
      {
        title: 'What is the Purpose?',
        description: 'To Show Something different Here and Here and HEre',
        image: 'img/2.jpg',
      },
      {
        title: 'Why Choose this?',
        description: 'Because of this and that and this again',
        image: 'img/3.jpg',
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
