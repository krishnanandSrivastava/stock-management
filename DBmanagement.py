import sqlite3, eel
from sqlite3 import Error
import random

def reset_database():
    create_connection("database_one.db")
    drop_table()
    create_table()
    create_table_sold()
    create_gst_table()
    create_qr_table()
    create_week_table()
    create_month_table()
    create_vendor_table()
    default_gst_value()
    default_month_entry()
    default_week_entry()
    insert_qr({"id": 1, "serialno": 00000, "date": 0})


def drop_table():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''DROP TABLE INVENTORY;''')
        conn.execute('''DROP TABLE QR;''')
        conn.execute('''DROP TABLE GST;''')
        conn.execute('''DROP TABLE WEEK;''')
        conn.execute('''DROP TABLE MONTH;''')
        conn.execute('''DROP TABLE VENDOR;''')
        conn.execute('''DROP TABLE SOLD;''')

    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        # print(sqlite3.version)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def create_table_sold():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''CREATE TABLE SOLD
         (BARCODE INT PRIMARY KEY     NOT NULL,
         SERIALNO           INT    NOT NULL,
         PRICE            INT     NOT NULL,
         DIS        INT,
         VENDOR     INT,
         DESCRIPTION    TEXT,
         COSTPRICE  INT);''')
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def create_table():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''CREATE TABLE INVENTORY
         (BARCODE INT PRIMARY KEY     NOT NULL,
         SERIALNO           INT    NOT NULL,
         PRICE            INT     NOT NULL,
         DIS        INT,
         VENDOR     INT,
         DESCRIPTION    TEXT,
         COSTPRICE  INT);''')
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def insert_data(data):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        sql = '''INSERT INTO INVENTORY VALUES ({},{},{},{});'''.format(data["barcode"], data['serialno'], data['price'],
                                                                       data['dis'])
        # print(sql)
        conn.execute(sql)
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def create_qr_table():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''CREATE TABLE QR
         (ID INT PRIMARY KEY     NOT NULL,
         SERIALNO           INT    NOT NULL,
         DATE            INT     NOT NULL);''')
        conn.commit()
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def insert_qr(data):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''INSERT INTO QR VALUES ({},{},{});'''.format(data["id"], data["serialno"], data["date"]))
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def get_qr(date_in):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        # print(sqlite3.version)
        cur.execute('''select * from QR where ID=1;''')
        rows = cur.fetchall()
        row = rows[0]
        serialno = row[1]
        date = row[2]
        if (int(date_in) > date):
            conn.execute('''update QR set DATE ={} ,SERIALNO={} where ID=1;'''.format(int(date_in), 0))
            conn.commit()
            print("DB updated")
            return 0
        else:
            return serialno + 1
    except Error as e:
        print(e)
        return e
    finally:
        if conn:
            conn.close()


def update_end_qr(end):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''update QR set SERIALNO={} where ID=1;'''.format(int(end)))
        conn.commit()
        print("DB updated")
        return 1
    except Error as e:
        print(e)
        return e
    finally:
        if conn:
            conn.close()


def create_week_table():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''CREATE TABLE WEEK
         (ID INT PRIMARY KEY     NOT NULL,
         DATE           INT    NOT NULL,
         DAY            INT     NOT NULL,
         COUNT            INT     NOT NULL);''')
        conn.commit()
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def create_month_table():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''CREATE TABLE MONTH
         (ID INT PRIMARY KEY     NOT NULL,
         DATE           INT    NOT NULL,
         MONTH            INT     NOT NULL,
         COUNT            INT     NOT NULL);''')
        conn.commit()
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def default_week_entry():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        date = 200912
        for i in range(0, 7):
            conn.execute('''INSERT INTO WEEK    VALUES ({},{},{},{});'''.format(i + 1, date, i, random.randint(10,30)))
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def default_month_entry():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        date = 2009
        for i in range(0, 12):
            conn.execute('''INSERT INTO MONTH    VALUES ({},{},{},{});'''.format(i + 1, date, i, random.randint(10,30)))
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def create_vendor_table():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''CREATE TABLE VENDOR
         (ID INTEGER PRIMARY KEY   AUTOINCREMENT  NOT NULL,
         NAME           TEXT    NOT NULL);''')
        conn.commit()
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def add_vendor(n):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute("INSERT INTO VENDOR ({0}) "
                     "VALUES ({1});".format("NAME", n))
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def return_vendor_list():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        # print(sqlite3.version)
        cur.execute('''select * from VENDOR;''')
        rows = cur.fetchall()
        # for row in rows:
        #     print(row);
        return rows
    except Error as e:
        print(e)
        return e
    finally:
        if conn:
            conn.close()


def update_inventory(datas):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        for data in datas:
            conn.execute(
                "INSERT INTO INVENTORY VALUES ({},{},{},{},{},{},{});".format(int(data["barcode"]),
                                                                              int(data["serialno"]),
                                                                              int(data["price"]), int(data["dis"]),
                                                                              int(data["vendor"]),
                                                                              '"' + data["description"] + '"',
                                                                              data["costprice"]))
            print("updated Inventory")
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def create_gst_table():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''CREATE TABLE GST
         (ID INTEGER PRIMARY KEY    NOT NULL,
         GSTNO           TEXT    NOT NULL,
         TAX              INT NOT NULL);''')
        conn.commit()
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def default_gst_value():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute("INSERT INTO GST VALUES ({},{},{});".format(1, '"GSTNO1234567"', 18))
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def update_gst(data):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        conn.execute('''update GST set GSTNO={},TAX={} where ID=1;'''.format('"' + data["gstno"] + '"', data["tax"]))
        conn.commit()
        print("DB updated")
        return 1
    except Error as e:
        print(e)
        return e
    finally:
        if conn:
            conn.close()


def get_gst():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        cur.execute('''select GSTNO,TAX from GST where ID=1;''')
        rows = cur.fetchall()
        row = rows[0]
        gstno = row[0]
        tax = row[1]
        return {"gstno": gstno, "tax": tax}
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def get_data_from_inventory(barcode):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        cur.execute('''select * from INVENTORY where BARCODE={};'''.format(barcode));
        rows = cur.fetchall()
        # print(rows)
        row = rows[0]
        # print(row)
        return {"barcode": row[0], "price": row[2], "dis": row[3], "serialno": row[1], "vendor": row[4],
                "description": row[5], "costprice": row[6]}
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def get_data_from_sold(barcode):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        cur.execute('''select * from SOLD where BARCODE={};'''.format(barcode));
        rows = cur.fetchall()
        # print(rows)
        row = rows[0]
        # print(row)
        return {"barcode": row[0], "price": row[2], "dis": row[3], "serialno": row[1], "vendor": row[4],
                "description": row[5], "costprice": row[6]}
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

def update_sold(datas):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        # print(sqlite3.version)
        for data in datas:
            print(data)
            conn.execute(
                "INSERT INTO SOLD VALUES ({},{},{},{},{},{},{});".format(int(data["barcode"]),
                                                                         int(data["serialno"]),
                                                                         int(data["price"]), int(data["dis"]),
                                                                         int(data["vendor"]),
                                                                         '"' + data["description"] + '"',
                                                                         data["costprice"]))
            print("updated Inventory")
        conn.commit()
        return 1
    except Error as e:
        print(e)
        return 0
    finally:
        if conn:
            conn.close()


def delete_from_inventory(barcodes):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        for barcode in barcodes:
            conn.execute('''DELETE FROM INVENTORY WHERE BARCODE= {}'''.format(int(barcode)))
            conn.commit()
            print(barcode + " deleted from inventory")
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

def delete_from_sold(barcodes):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        for barcode in barcodes:
            conn.execute('''DELETE FROM SOLD WHERE BARCODE= {}'''.format(int(barcode)))
            conn.commit()
            print(barcode + " deleted from inventory")
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def on_print_invoice(barcodes):
    conn = None
    sold_data = []
    print(len(barcodes))
    try:
        for barcode in barcodes:
            # print(barcode)
            # print(type(barcode))
            data = get_data_from_inventory(int(barcode))
            sold_data.append(data)
        update_sold(sold_data)
        delete_from_inventory(barcodes)
        print("task completed")
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def on_return(barcodes):
    conn = None
    inventory_data = []
    print(len(barcodes))
    try:
        for barcode in barcodes:
            print(barcode)
            # print(type(barcode))
            data = get_data_from_sold(int(barcode))
            inventory_data.append(data)
        update_inventory(inventory_data)
        delete_from_sold(barcodes)
        print("task completed Item returned")
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def update_week_table(data):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        cur.execute('''select * from WEEK where DAY ={} '''.format(data["day"]));
        rows = cur.fetchall()
        # print(rows)
        row = rows[0]
        date = row[1]
        count = int(row[3])
        if (int(data["date"]) > date):
            conn.execute(
                '''UPDATE WEEK SET DATE={},COUNT={} WHERE DAY={}'''.format(int(data["date"]), int(data['count']),
                                                                           int(data["day"])))
            conn.commit()
        else:
            conn.execute(
                '''UPDATE WEEK SET COUNT={} WHERE DAY={}'''.format(int(data['count']) + count, int(data["day"])))
            conn.commit()
        # print(row)
        print(" updated week")
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def update_month_table(data):
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        cur.execute('''select * from MONTH where MONTH ={} '''.format(data["month"]));
        rows = cur.fetchall()
        # print(rows)
        row = rows[0]
        date = row[1]
        count = int(row[3])
        if (int(data["date"]) > date):
            conn.execute(
                '''UPDATE MONTH SET DATE={},COUNT={} WHERE MONTH={}'''.format(int(data["date"]), int(data['count']),
                                                                              int(data["month"])))
            conn.commit()
        else:
            conn.execute(
                '''UPDATE MONTH SET COUNT={} WHERE MONTH={}'''.format(int(data['count']) + count, int(data["month"])))
            conn.commit()
        # print(row)
        print(" updated month")
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()


def fetch_all_inventory():
    conn = None
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        cur.execute('''select * from INVENTORY where BARCODE IS NOT NULL ;''');
        rows = cur.fetchall()
        cur.execute('''select * from VENDOR where ID IS NOT NULL ;''');
        vendor_list =cur.fetchall();
        newRows=[]
        for row in rows:
            newRows.append(' '.join([str(elem) for elem in row]).split(' '))
        # print(newRows)
        eel.show_inventory(newRows,vendor_list);
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

def fetch_all_graph_data():
    conn = None
    vendorData=[]
    week=[]
    month=[]
    vendorName=[]
    try:
        conn = sqlite3.connect("database_one.db")
        cur = conn.cursor();
        cur.execute('''select COUNT from WEEK where ID IS NOT NULL ;''');
        dataWeek =cur.fetchall();
        cur.execute('''select * from VENDOR where ID IS NOT NULL ;''');
        vendor =cur.fetchall();
        cur.execute('''select COUNT from MONTH where ID IS NOT NULL ;''');
        dataMonth =cur.fetchall();
        for w in dataWeek:
            week.append(w[0])
        for w in dataMonth:
            month.append(w[0])
        for ven in vendor:
            cur.execute('''select COUNT(*) from INVENTORY where VENDOR= {}'''.format(ven[0]))
            vendorName.append(ven[1])
            invendata=cur.fetchall()
            vendorData.append(invendata[0][0])
            #print(invendata[0][0])
        # return {"week":week,"month":month,"vendorName":vendorName,"vendorData":vendorData}
        eel.drawAllGraph({"week":week,"month":month,"vendorName":vendorName,"vendorData":vendorData})
        # print(week,vendorName,month,vendorData)
    except Error as e:
        print(e)
    finally:
        if conn:
            conn.close()

