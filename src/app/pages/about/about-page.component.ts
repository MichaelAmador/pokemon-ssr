import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platform)) {
    //   document.title = 'About Page';
    // }

    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'This is the About Page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About Page',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'About,Info Page',
    });
  }
}
