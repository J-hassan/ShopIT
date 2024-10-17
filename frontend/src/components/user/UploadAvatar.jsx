import React, { useEffect, useState } from 'react';
import UserLayout from "../layout/UserLayout";
import { useNavigate } from 'react-router-dom';
import { useUploadAvatarMutation } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UploadAvatar = () => {

    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(
        user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
    );

    const [UploadAvatar, { isLoading, error, isSuccess }] = useUploadAvatarMutation();

    useEffect(() => {
      if (error) {
        toast.error(error?.data?.message);
      }

      if (isSuccess) {
        toast.success("Avatar Updated");
        navigate("/me/profile");
      }
    }, [error, isSuccess, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!avatar) {
          toast.error("Please select an avatar to upload.");
          return;
        }

        UploadAvatar({ avatar });
    };

    const onChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;  // Avoid proceeding if no file is selected

        if (file && !file.type.startsWith("image/")) {
          toast.error("Please upload a valid image file.");
          return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPrev(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    return (
      <UserLayout>
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form className="shadow rounded bg-body" onSubmit={submitHandler}>
              <h2 className="mb-4">Upload Avatar</h2>

              <div className="mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <figure className="avatar item-rtl">
                      <img src={avatarPrev} className="rounded-circle" alt="Avatar Preview" />
                    </figure>
                  </div>
                  <div className="input-form">
                    <label className="form-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                    <input
                      type="file"
                      name="avatar"
                      className="form-control"
                      id="customFile"
                      accept="image/*"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <button
                id="register_button"
                type="submit"
                className="btn w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? <span className="spinner-border spinner-border-sm"></span> : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </UserLayout>
    );
};

export default UploadAvatar;
