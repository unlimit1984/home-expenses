import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config/config.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public backendMessage$: Observable<string>;
  constructor(private http: HttpClient, private configService: ConfigService) {}

  ngOnInit(): void {
    // this.backendMessage$ = this.http.get<string>(`${this.configService.config.API}/test/hello`);

    const request = this.http.get<string>(`${this.configService.config.API}/test/hello`);
    request.subscribe((value) => {
      console.log('=test', value);
    });

    this.http.get<string>(`${this.configService.config.API}/test/hello-as-json`).subscribe((value) => {
      console.log('=hello-as-json', value);
    });

    this.http
      .get('https://api.nbp.pl/api/exchangerates/rates/a/gbp/2012-01-01/2012-01-31?format=json')
      .subscribe((value) => {
        console.log('nbp response=', value);
      });
  }
}
