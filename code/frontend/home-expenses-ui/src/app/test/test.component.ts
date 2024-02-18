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
  public backendMessage1$: Observable<string>;
  public backendMessage2$: Observable<{ value: string }>;
  constructor(private http: HttpClient, private configService: ConfigService) {}

  ngOnInit(): void {
    this.backendMessage1$ = this.http.get(`${this.configService.config.API}/test/hello`, {
      responseType: 'text'
    });

    this.backendMessage2$ = this.http.get<{ value: string }>(`${this.configService.config.API}/test/hello-as-json`);
  }
}
