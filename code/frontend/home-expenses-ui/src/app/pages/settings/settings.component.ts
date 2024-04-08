/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  public form: FormGroup;
  public configService = inject(ConfigService);

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    const lang = this.configService.getSelectedLanguage();

    this.form = this.fb.group({
      lang: this.fb.control(lang, [Validators.required])
    });
  }

  public save() {
    if (this.form.valid) {
      const lang = this.form.getRawValue()?.lang;
      this.configService.setSelectedLanguage(lang);
    }
  }
}
