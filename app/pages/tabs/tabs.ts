import {Page, NavParams} from 'ionic-angular';
import {SpecialsPage} from '../specials/specials';
import {BarsPage} from '../bars/bars';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SpecialsPage;
  tab2Root: any = BarsPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
