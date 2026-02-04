import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FiltersApi } from "../../../services/filters-api";
import { AdminHeader } from "../header/header";
import { IFilter } from "../../../models/filter";

@Component({
  standalone: true,
  selector: 'admin-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filters.html',
  styleUrls: ['./filters.scss'],
  imports: [CommonModule, FormsModule, AdminHeader],
})
export class AdminFilters implements OnInit {
  filters: IFilter[] = [];
  newName = '';
  isLoading = false;

  constructor(private filtersApi: FiltersApi, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.filtersApi.getAll().subscribe(res => {
      this.filters = res;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  add() {
    const name = this.newName.trim();
    if (!name) return;

    this.filtersApi.add({ name }).subscribe(() => {
      this.newName = '';
      this.load();
    });
  }

  update(filter: IFilter) {
    this.filtersApi.update(filter).subscribe();
  }

  remove(id: number) {
    this.filtersApi.delete(id).subscribe(() => {
      this.load()
    });
  }
}
