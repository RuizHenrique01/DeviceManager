import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/interfaces/device.interface';
import { DeviceService } from 'src/app/services/device.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.css']
})
export class ListDevicesComponent implements OnInit {

  listDevice: Device[] = [];
  deviceSelected?: Device;
  searchTerm: string = '';

  constructor(
    private deviceService: DeviceService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.listDevices();
  }

  listDevices() {
    this.deviceService.list().subscribe(r => this.listDevice = r);
  }

  filteredDevices(): Device[] {
    return this.listDevice.filter(device =>
      String(device.partNumber).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      device.color.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      device.category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectDevice(Device: Device){
    this.deviceSelected = Device;
  }

  deleteDevice(){
    this.deviceService.delete(this.deviceSelected!.id).subscribe({
      next: () => {
        this.toastService.show("Category removed successfully.", 'success');
        this.listDevices()
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(err.error?.message || 'An unexpected error occurred.', 'danger');
      }
    });
  }

}
