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
        title: 'Welcome to <b>BAR APP</b>',
        description: 'Some Info Here',
        image: 'img/1.jpg',
      },
      {
        title: 'What is BA?',
        description: 'BA BA BA BA BA BA',
        image: 'img/2.jpg',
      },
      {
        title: 'why is BA BA?',
        description: 'The <b>BA/b> BABAh BABABABABABA BABABABABA',
        image: 'img/4.jpg',
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
