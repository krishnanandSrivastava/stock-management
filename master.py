import eel, DBmanagement


@eel.expose
def insert_data(data):
    try:
        return DBmanagement.insert_data(data);
    except Exception as e:
        return 0;


@eel.expose
def get_qr(date):
    return DBmanagement.get_qr(date)


@eel.expose
def update_end_qr(end):
    eel.spawn(DBmanagement.update_end_qr, end)


@eel.expose
def add_vendor(name):
    k = eel.spawn(DBmanagement.add_vendor, name)
    return 1;


@eel.expose
def return_vendor_list():
    return DBmanagement.return_vendor_list()


@eel.expose
def update_inventory(data):
    eel.spawn(DBmanagement.update_inventory,data);

@eel.expose
def update_gst(data):
    eel.spawn(DBmanagement.update_gst,data)

@eel.expose
def reset_database():
    DBmanagement.reset_database()
    return 1

@eel.expose
def get_gst():
    return DBmanagement.get_gst();

@eel.expose
def get_data_from_inventory(barcode):
    return DBmanagement.get_data_from_inventory(barcode)


@eel.expose
def on_print_invoice(barcodes):
    eel.spawn(DBmanagement.on_print_invoice,barcodes)

@eel.expose
def on_return(barcodes):
    eel.spawn(DBmanagement.on_return,barcodes)

@eel.expose
def update_week_table(data):
    print(data)
    eel.spawn(DBmanagement.update_week_table,data)


@eel.expose
def update_month_table(data):
    print(data)
    eel.spawn(DBmanagement.update_month_table,data)

@eel.expose
def fetch_all_inventory():
    eel.spawn(DBmanagement.fetch_all_inventory)


@eel.expose
def fetch_all_graph_data():
    eel.spawn(DBmanagement.fetch_all_graph_data)





eel.init('web')
eel.start('index.html',size=(1366,768))
