<div dir="rtl">

# مستندات نصب

برای نصب و راه‌اندازی موفق قسمت back-end، پیش‌نهاد می‌شود مراحل زیر را به ترتیب و مطابق با دستورالعمل‌های گفته شده انجام دهید.

1. مطمئن شوید نرم‌افزار [پایتون](https://www.python.org/downloads/) را نصب کرده‌اید. 

> برای اطمینان از نصب موفقیت‌آمیز و قرار گرفتن پایتون در `environment variables‍` ابتدا ترمینال را باز کرده و سپس دستور `python3 --version` را وارد نمایید.

2. سپس به کمک دستور زیر `virtualenv` را نصب کنید.

<div dir="ltr">

```
> pip3 install virtualenv
```
</div>

3. در مسیر جدید یک `virtualenv` جدید بسازید و سپس آن را فعال کنید. این کار به شما کمک می‌کند تا پکیج‌های مورد نیاز پروژه را در دایرکتوری آن دانلود، نصب و اضافه نمایید.

<div dir="ltr">

```
> virtualenv venv
> source venv/bin/activate
```
</div>

4. حال کافی است که پکیج‌های مورد نیاز پروژه که قبلا در فایل `requirements.txt` لیست شده‌اند را نصب کنید.

<div dir="ltr">

```
> (venv) pip3 install -r requirements.txt
```
</div>

5. داخل پوشه‌ی  `transportation` رفته و برای ساخته شدن جدول‌های پایگاه‌داده و هم‌چنین اجرا شدن سرور، دستورهای زیر را اجرا کنید.

<div dir="ltr">

```
> (venv) python3 manage.py makemigrations
> (venv) python3 manage.py migrate
> (venv) python3 manage.py runserver
```
</div>

</div>